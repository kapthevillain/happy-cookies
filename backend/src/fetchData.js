const db = require("./db");

async function fetchUser(userId) {
  const user = await db.query.user(
    { where: { id: userId } },
    "{id, permissions, name, email}"
  );
  return user;
}
async function fetchVendor(vendorId) {
  const vendor = await db.query.vendor(
    { where: { id: vendorId } },
    "{id, permissions, companyName, email}"
  );
  return vendor;
}

function checkLoginType(userId, vendorId) {
  if (userId && !vendorId) {
    return "USER";
  }
  if (!userId && vendorId) {
    return "VENDOR";
  }
  if (userId && vendorId) {
    return "VENDORUSER";
  }
  // if (!userId && !vendorId) {
  //   return "GUEST";
  // }
  return null;
}

exports.fetchUser = fetchUser;
exports.fetchVendor = fetchVendor;
exports.checkLoginType = checkLoginType;
