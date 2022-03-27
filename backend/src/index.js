// let's go!

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "variables.env"
});
const createServer = require("./createServer");

const { fetchUser, fetchVendor, checkLoginType } = require("./fetchData");

const server = createServer();

server.express.use(cookieParser());

// decode the JWT so we can get userID for each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    const { vendorId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto the request for future requests to access
    req.userId = userId;
    req.vendorId = vendorId;
  }
  next();
});

// 2. create a middle ware that populates the user on each request
server.express.use(async (req, res, next) => {
  // check which loginType. User, Vendor, or VendorUser
  const loginType = checkLoginType(req.userId, req.vendorId);

  // if they aren't logged in, skip this
  if (!loginType) return next();

  if (loginType === "USER") {
    const user = await fetchUser(req.userId);
    req.user = user;
  }
  if (loginType === "VENDOR") {
    const vendor = await fetchVendor(req.vendorId);
    req.vendor = vendor;
  }
  if (loginType === "VENDORUSER") {
    const user = await fetchUser(req.userId);
    const vendor = await fetchVendor(req.vendorId);
    req.user = user;
    req.vendor = vendor;
  }
  // if (loginType === "GUEST") {

  // }

  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
