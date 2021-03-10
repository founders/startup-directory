import dbConnect from '../../../middleware/dbConnect';
import { getNewOrgId } from '../../../middleware/helpers';
import Org from '../../../models/Org';

/**
 * Returns one 'organization' document, may be null
 *
 */
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  const id = await getNewOrgId(req.body?.name);

  switch (method) {
    case 'GET':
      try {
        const orgs = await Org.find();
        if (!orgs) {
          return res
            .status(400)
            .json({ success: false, message: 'no orgs found' });
        }

        res.status(200).json({ success: true, data: org });
      } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
      }
      break;

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
      res.status(400).json({ success: false, message: 'method not supported' });
      break;
  }
}
