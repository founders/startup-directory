import Org from '../models/Org';

// Creates a unique ID for each organization in the directory
// Currently, ID is just index of org in database
// TODO: update ID generation to be more secure
async function getNewOrgId(name) {
  const id = await Org.countDocuments();
  return id + 1;
}

export { getNewOrgId };
