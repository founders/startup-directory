import dbConnect from '../../../middleware/dbConnect';
import Org from '../../../models/Org';

export default async function handler(req, res) {
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
      res.status(400).json({ success: false, message: 'method not supported' });
      break;
  }
}
