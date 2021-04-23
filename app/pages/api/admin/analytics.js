import dbConnect from '../../../middleware/dbConnect';
import Account from '../../../models/Account';
import Org from '../../../models/Org';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

/**
 * api/admin/analytics
 * GET: return some analytics about the startup directory
 * @param {*} req api request
 * @param {*} res server response
 * @returns JSON with data if successful, error message if not
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
    case 'GET':
      try {
        const startupCount = await Org.count({});
        const accountCount = await Account.count({});

        const analytics = {
          startupCount,
          accountCount,
        };

        if (Object.keys(analytics).some((key) => !analytics[key])) {
          return res
            .status(500)
            .json({ success: false, message: 'analytics error' });
        }

        res.status(200).json({ success: true, data: { ...analytics } });
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
