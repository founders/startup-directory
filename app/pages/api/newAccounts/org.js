import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Account from '../../../models/Account';
import Org from '../../../models/Org';
import dbConnect from '../../../middleware/dbConnect';
import { getNewOrgId } from '../../../middleware/helpers';
import { useUser } from '@auth0/nextjs-auth0';

/**
 * Returns one 'organization' document, may be null
 *
 */
async function handler(req, res) {
  try {
    const {
      query: { accountId },
      method,
    } = req;

    const { user } = userUser();
    const email = user.email;

    await dbConnect();

    switch (method) {
      /*
      req should have: 
      email: email associated with account that has post access
      org: org to be posted, matching Org Schema
      */
      case 'POST':
        //if orgId of account [id] is undefined, go through with post, else respond: can only create one organization
        // if post: update account [id] and create Org with body
        try {
          const account = await Account.findOne({ email });
          if (!account) {
            return res
              .status(400)
              .json({ success: false, message: 'no account found with email' });
          }

          if (account?.['orgId']) {
            //reject post
            return res
              .status(400)
              .json({ success: false, message: 'only one org per account' });
          }

          const id = await getNewOrgId(req.body?.org.name);
          const org = await Org.create({
            ...req.body.org,
            id,
          });

          await Account.updateOne({ email }, { orgId: id }, { upsert: false });

          res.status(201).json({ success: true, data: org });
        } catch (error) {
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

          //$set: change only the fields provided; upsert: don't insert a new document if one isn't found
          const org = await Org.updateOne(
            { id: account?.orgId },
            { $set: req.body },
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
