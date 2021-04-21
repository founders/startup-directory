import dbConnect from '../../../../middleware/dbConnect';
import Whitelist from '../../../../models/Whitelist';
import Account from '../../../../models/Account';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

/**
 * api/admin/whitelist
 * GET: return the whitelist array
 * PATCH: update the whitelist
 * @param {*} req api request
 * @param {*} res server response
 * @returns JSON with org data if successful, error message if not
 */
async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const {
    user: { email, email_verified },
  } = getSession(req, res);

  // reject if no valid auth user provided
  if (!email || !email_verified) {
    return res
      .status(403)
      .json({ success: false, message: 'no credentials provided' });
  }

  const maybeAccount = await Account.findOne({ email });

  // reject if user is null or not an admin
  if (!maybeAccount?.isAdmin) {
    return res
      .status(401)
      .json({ success: false, message: 'unauthorized user' });
  }

  switch (method) {
    case 'POST':
      try {
        const oldWhitelist = await Whitelist.findOne();

        if (oldWhitelist) {
          return res
            .status(400)
            .json({ success: false, message: 'whitelist already exists' });
        }

        const whitelist = await Whitelist.create({
          data: [],
          lastUpdated: new Date().toLocaleString(),
        });

        if (!whitelist) {
          return res.status(500).json({
            success: false,
            message: 'whitelist could not be created',
          });
        }

        res.status(200).json({ success: true, data: whitelist });
      } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
      }
      break;
    case 'GET':
      try {
        const whitelist = await Whitelist.findOne();

        if (!whitelist) {
          return res
            .status(404)
            .json({ success: false, message: 'whitelist missing' });
        }

        res.status(200).json({ success: true, data: whitelist });
      } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
      }
      break;

    case 'PATCH':
      try {
        const whitelist = await Whitelist.findOne();
        const body = JSON.parse(req.body);

        if (!body.data) {
          return res
            .status(400)
            .json({ success: false, message: 'request body missing' });
        }

        if (!whitelist) {
          return res
            .status(404)
            .json({ success: false, message: 'whitelist missing' });
        }

        const newWhitelist = await Whitelist.findOneAndUpdate(
          {},
          {
            data: body.data,
            lastUpdated: new Date().toLocaleString(),
          },
          { new: true },
        );

        res.status(200).json({ success: true, data: newWhitelist });
      } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'method not supported' });
      break;
  }
}

export default withApiAuthRequired(handler);
