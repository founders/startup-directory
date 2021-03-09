import Org from '../models/Org';

async function getNewOrgId(name) {
  let id = await Org.countDocuments();
  return id + 1;
}

export { getNewOrgId };
