import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Account from '../../../models/Account';
import Org from '../../../models/Org';
import dbConnect from '../../../middleware/dbConnect';
import { getNewOrgId } from '../../../middleware/helpers';

/**
 * Returns one 'organization' document, may be null
 *
 */
async function handler(req, res) {
  try {
    const { method, body: bodyString } = req;
    const { email, org } = JSON.parse(bodyString);

    await dbConnect();

    switch (method) {
      /*
      req should have: 
      email: email associated with account that has post access
      org: org to be posted, matching Org Schema
      */
      case 'POST':
        try {
          const account = await Account.findOne({ email });
          // no account in database matches authenticated user
          if (!account) {
            return res
              .status(400)
              .json({ success: false, message: 'no account found with email' });
          }

          // reject post if the account is already associated with an organization
          if (account.orgId) {
            return res
              .status(409)
              .json({ success: false, message: 'only one org per account' });
          }

          const id = getNewOrgId(org.name);

          const createOrg = await Org.create({
            ...org,
            id,
          });

          // TODO: Catch this break point (we'll have a dataleak for an org if the subsequent request fails)

          await Account.findOneAndUpdate(
            { email },
            { orgId: id },
            { upsert: false },
          );
          res.status(201).json({ success: true, data: createOrg });
        } catch (error) {
          console.error(error);
          res.status(400).json({ success: false, message: error?.message });
        }
        break;

      /*
      req should have: 
      email: email associated with account that has post access
      org: org to be updated, matching Org Schema without ID (can't change ID)
      */
      case 'PATCH':
        try {
          const account = await Account.findOne({ email });

          if (!account?.['orgId']) {
            return res
              .status(400)
              .json({ success: false, message: 'no associated organization' });
          }

          const bodyObj = JSON.parse(req.body);

          if (bodyObj.email) {
            delete bodyObj.email;
          }

          // $set: change only the fields provided; upsert: don't insert a new document if one isn't found
          const org = await Org.findOneAndUpdate(
            { id: account?.orgId },
            { $set: bodyObj },
            { upsert: false },
          );

          if (!org) {
            return res
              .status(400)
              .json({ success: false, message: 'org not found' });
          }

          res.status(200).json({ success: true, data: org });
        } catch (error) {
          res.status(400).json({ success: false, message: error?.message });
        }
        break;

      default:
        res
          .status(400)
          .json({ success: false, message: 'method not supported' });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}

export default withApiAuthRequired(handler);
