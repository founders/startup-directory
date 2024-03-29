import dbConnect from '../../../middleware/dbConnect';
import { getNewOrgId } from '../../../middleware/helpers';
import Org from '../../../models/Org';

/**
 * Returns one 'organization' document, may be null
 *
 */
export default async function handler(req, res) {
  try {
    const { method, query } = req;
    await dbConnect();
    switch (method) {
      case 'GET':
        try {
          const filter =
            query && query.findAll ? {} : { isHidden: { $ne: true } };
          const orgs = await Org.find(filter).sort('isHidden');
          if (!orgs) {
            return res
              .status(400)
              .json({ success: false, message: 'no orgs found' });
          }
          res.status(200).json({ success: true, data: orgs });
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
