import dbConnect from '../../../middleware/dbConnect';
import { getNewOrgId } from '../../../middleware/helpers';
import Org from '../../../models/Org';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

/**
 * Returns one 'organization' document, may be null
 *
 */
async function handler(req, res) {
  try {
    const { method } = req;
    await dbConnect();
    const id = await getNewOrgId(req.body?.name);

    switch (method) {
      case 'POST':
        try {
          const org = await Org.create({
            ...req.body,
            id,
          });

          res.status(201).json({ success: true, data: org });
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

export default handler;
