import dbConnect from '../../../../middleware/dbConnect';
import Org from '../../../../models/Org';

import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

/**
 * api/organizations/[id]/patch
 * PATCH: update the organization matching [id]
 *    - only updates fields provided by body
 *    - will reject if body contains ID
 * @param {*} req api request
 * @param {*} res server response
 * @returns JSON with org data if successful, error message if not
 */
async function handler(req, res) {
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
              .status(400)
              .json({ success: false, message: 'org not found' });
          }

          res.status(200).json({ success: true, data: org });
        } catch (error) {
          res.status(400).json({ success: false, message: error?.message });
        }
        break;

      case 'PATCH':
        try {
          //reject any request that tries to change the ID
          if ('id' in req.body) {
            return res
              .status(400)
              .json({ success: false, message: 'ID cannot be changed' });
          }

          //$set: change only the fields provided; upsert: don't insert a new document if one isn't found
          const org = await Org.update(
            { id: id },
            { $set: req.body },
            { upsert: false },
          );

          if (!org) {
            return res
              .status(400)
              .json({ success: false, message: error?.message });
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
