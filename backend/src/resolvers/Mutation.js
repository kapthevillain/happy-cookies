const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../mail");
const { hasPermission } = require("../utils");
const stripe = require("../stripe");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.request.vendorId) {
      throw new Error("You must be logged in to do that!");
    }

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          vendor: {
            // this is how to create a relationship between a Item and the User
            connect: {
              id: ctx.request.vendorId
            }
          },
          ...args,
          cbdType: { set: args.cbdType },
          tags: { set: args.tags }
        }
      },
      info
    );

    console.log("item: ", item);
    return item;
  },

  updateItem(parent, args, ctx, info) {
    if (!ctx.request.vendorId) {
      throw new Error("You must be logged in!");
    }
    console.log(">>> args", args);

    // first take a copy of the updates
    const updates = {
      ...args,
      cbdType: { set: args.cbdType },
      tags: { set: args.tags }
    };
    // remove ID from the updates
    delete updates.id;
    // run update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    const where = {
      id: args.id
    };
    // 1. find the item
    const item = await ctx.db.query.item(
      {
        where
      },
      `{ id title user { id } }`
    );
    // 2. Check if they own that item, or have the permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "ITEMDELETE"].includes(permission)
    );

    if (!ownsItem && !hasPermissions) {
      throw new Error("You do not have permissions to do that!");
    }
    // 3. Delete it!
    return ctx.db.mutation.deleteItem(
      {
        where
      },
      info
    );
  },

  async signUp(parent, args, ctx, info) {
    // lowercase the users email
    args.email = args.email.toLowerCase();

    // hash the users password
    const password = await bcrypt.hash(args.password, 10);

    // create user in database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );

    // create JWT token for user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set JWT as cookie on response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    // Return user to the browser
    return user;
  },

  async signIn(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. check if pass is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    // 3. generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. set cookie with token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // 5. return user
    return user;
  },

  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "See ya later!" };
  },

  async requestReset(parent, args, ctx, info) {
    // 1. check if real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // 2. set a reset token and expiry on that user
    const randBytesPromisified = promisify(randomBytes);
    const resetToken = (await randBytesPromisified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    // 3. Email them that rest token
    // TODO: add try/catch for email sending errors
    const mailRes = await transport.sendMail({
      from: "happy@test.com",
      to: user.email,
      subject: "Your Password reset token",
      html: makeANiceEmail(
        `Your password reset token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>`
      )
    });

    // 4. return the message
    return { message: "thanks!!" };

    //
  },

  async resetPassword(parent, args, ctx, info) {
    // check if pass match
    if (args.password !== args.confirmPassword) {
      throw new Error("Your passwords don't match");
    }
    // check if legit reset token
    // check if it's expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });

    if (!user) {
      throw new Error("this token is either invalid or expired");
    }
    // hash new password
    const password = await bcrypt.hash(args.password, 10);
    // save new pass to user & remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // set JWT cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Return new user
    return updatedUser;
  },

  async updatePermissions(parent, args, ctx, info) {
    // 1. check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    // 2. query the current user
    const currentUser = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      info
    );
    // 3. check if they have permission to do this
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    // 4. update permissions

    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: { id: args.userId }
      },
      info
    );
  },

  async addToCart(parent, args, ctx, info) {
    // 1. check if they are logged in
    const userId = ctx.request.userId;
    if (!userId) {
      throw new Error("You must be logged in!");
    }
    // 2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems(
      {
        where: {
          user: { id: userId },
          item: { id: args.id }
        }
      },
      info
    );
    // 3. check if that item is already in their cart if so, increment by 1
    if (existingCartItem) {
      console.log("this item is already in your cart");
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        },
        info
      );
    }

    // 4. if not, create fresh cartItem for that user
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: { connect: { id: userId } },
          item: { connect: { id: args.id } }
        }
      },
      info
    );
  },

  async removeFromCart(parent, args, ctx, info) {
    // 1. find cart item
    const cartItem = await ctx.db.query.cartItem(
      {
        where: { id: args.id }
      },
      `{ id, user { id } }`
    );

    // 2. Make sure we found an item
    if (!cartItem) {
      throw new Error("No cart item found!");
    }
    // 3. make sure user owns cart
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error("You don't own this cart!");
    }
    // 4. delete that cart item
    return ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id }
      },
      info
    );
  },

  async createOrder(parent, args, ctx, info) {
    // 1. query current user and make sure they're signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to complete this order");
    }
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
        id
        name
        email
        cart {
          id
          quantity
          item {
            id
            title
            price
            description
            image
            largeImage
          }
        }
      }`
    );

    // 2. recalculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );
    console.log(`Going to charge for a total of ${amount}`);

    // 3. create the stripe charge (turn token into money!!)
    const charge = await stripe.charges.create({
      amount,
      currency: "USD",
      source: args.token
    });
    // 4. convert cartItems to orderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.query,
        user: { connect: { id: userId } }
      };
      delete orderItem.id;
      return orderItem;
    });
    // 5. create order
    // TODO: catch errors here for clean errors for user
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    });
    // 6. clear users cart and delete cart items
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: { id_in: cartItemIds }
    });

    // 7. Notify vendor that orders have been placed
    // const mailRes = await transport.sendMail({
    //   from: "happy@test.com",
    //   to: user.email,
    //   subject: "Your Password reset token",
    //   html: makeANiceEmail(
    //     `Your password reset token is here!
    //     \n\n
    //     <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>`
    //   )
    // });

    // 8. return order to client
    return order;
  },

  // ADMIN MUTATIONS
  async vendorSignUp(parent, args, ctx, info) {
    // lowercase the vendor email
    args.email = args.email.toLowerCase();

    // hash the vendor password
    const password = await bcrypt.hash(args.password, 10);

    // create vendor in database
    const vendor = await ctx.db.mutation.createVendor(
      {
        data: {
          ...args,
          password,
          permissions: {
            set: [
              "VENDOR",
              "ITEMCREATE",
              "ITEMUPDATE",
              "ITEMDELETE",
              "PERMISSIONUPDATE"
            ]
          }
        }
      },
      info
    );

    // create JWT token for vendor
    const token = jwt.sign({ vendorId: vendor.id }, process.env.APP_SECRET);
    // set JWT as cookie on response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    // Return user to the browser
    return vendor;
  },
  async vendorSignIn(parent, { email, password }, ctx, info) {
    // 1. check if there is a vendor with that email
    const vendor = await ctx.db.query.vendor({ where: { email } });
    if (!vendor) {
      throw new Error(`No such vendor found for email ${email}`);
    }
    // 2. check if pass is correct
    const valid = await bcrypt.compare(password, vendor.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    // 3. generate JWT token
    const token = jwt.sign({ vendorId: vendor.id }, process.env.APP_SECRET);
    // 4. set cookie with token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // 5. return vendor
    return vendor;
  }
};

module.exports = Mutations;
