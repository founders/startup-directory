import dbConnect from '../../../middleware/dbConnect';
import Org from '../../../models/Org';
import Account from '../../../models/Account';

/**
 * api/organizations/[id]
 * GET: return the organization matching [id]
 * @param {*} req api request
 * @param {*} res server response
 * @returns JSON with org data if successful, error message if not
 */
export default async function handler(req, res) {
  try {
    const {
      query: { id },
      method,
    } = req;

    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const org = await Org.findOne({ id });
          if (!org) {
            return res
              .status(404)
              .json({ success: false, message: 'org not found' });
          }
          res.status(200).json({ success: true, data: org });
        } catch (error) {
          res.status(400).json({ success: false, message: error?.message });
        }
        break;

      case 'DELETE':
        try {
          const org = await Org.findOne({ id });
          if (!org) {
            return res
              .status(404)
              .json({ success: false, message: 'org not found' });
          }
          // Sanitize users that belong to this organization
          await Account.updateMany(
            {
              orgId: id,
            },
            {
              $set: { orgId: '' },
            },
          );
          await Org.deleteOne({ id });
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
