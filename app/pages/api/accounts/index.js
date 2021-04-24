import dbConnect from '../../../middleware/dbConnect';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Account from '../../../models/Account';

/**
 * Returns one 'organization' document, may be null
 *
 */
async function handler(req, res) {
  try {
    const { method } = req;
    await dbConnect();

    switch (method) {
      case 'POST':
        try {
          const { email } = JSON.parse(req.body);

          const maybeAccount = await Account.findOne({ email });
          if (maybeAccount) {
            return res.status(409).json({ success: true, data: maybeAccount });
          }

          const createdAccount = await Account.create({
            email,
            orgId: undefined,
            isAdmin: false,
          });

          res.status(201).json({ success: true, data: createdAccount });
        } catch (error) {
          res.status(400).json({ success: false, message: error?.message });
        }
        break;

      case 'GET':
        try {
          const account = await Account.findOne({ email });

          res.status(201).json({ success: true, data: account });
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
