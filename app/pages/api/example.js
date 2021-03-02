import { MongoError } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();

handler.use(middleware);

/**
 * Returns one 'organization' document, may be null
 */
handler.get(async (req, res) => {
  let doc = await req.db.collection('organization').findOne();
  if (doc) {
    res.json(doc);
  } else res.json({});
});

export default handler;
