import Org from '../models/Org';

// Creates a unique ID for each organization in the directory
// Currently, ID is just index of org in database
// TODO: update ID generation to be more secure
async function getNewOrgId(name) {
  //deprecated method:
  //const id = await Org.countDocuments();

  // strip punctuation, replace whitespace with hyphens, all lower case
  //name
  // .replace(/[^a-zA-Z ]/g, '')
  // .replace(/\s\s+/g, ' ')
  // .replace(/\s+/g, '-')
  // .toLowerCase();

  return Date.now();
}

export { getNewOrgId };
