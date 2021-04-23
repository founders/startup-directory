import dbConnect from '../../../../middleware/dbConnect';
import Whitelist from '../../../../models/Whitelist';

/**
 * api/admin/whitelist
 * GET: return the whitelist array
 * PATCH: update the whitelist
 * @param {*} req api request
 * @param {*} res server response
 * @returns JSON with org data if successful, error message if not
 */
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const truth = process.env.NEXT_PUBLIC_WHITELIST_PWD;
        const { token: attempt } = JSON.parse(req.body);

        if (attempt !== truth) {
          return res
            .status(401)
            .json({ success: false, message: 'unauthorized' });
        }

        const whitelist = await Whitelist.findOne();

        if (!whitelist) {
          return res
            .status(404)
            .json({ success: false, message: 'whitelist missing' });
        }

        res.status(200).send(whitelist.data.join('\n'));
      } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'method not supported' });
      break;
  }
}
