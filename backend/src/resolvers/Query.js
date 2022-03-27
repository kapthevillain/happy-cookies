const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there's a current userId
    if (!ctx.request.userId) {
      console.log(">>> ctx.request", ctx.request);

      // throw Error("No user Found!");
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    // 1. check if user is logged in
    console.log("query users");

    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }

    // 2. check if the user has permission to query all users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // 3. if they do, query all the users
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    // 1. check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // 2. query current user
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    );
    // 3. check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToViewOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermissionToViewOrder) {
      throw new Error("You don't have permission to view this order");
    }
    // 4. return the order
    return order;
  },

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in");
    }

    return ctx.db.query.orders({ where: { user: { id: userId } } }, info);
  },

  // VENDOR QUERIES
  vendor(parent, args, ctx, info) {
    // check if there's a current vendorId
    if (!ctx.request.vendorId) {
      // throw Error("No vendor Found!");
      return null;
    }
    return ctx.db.query.vendor(
      {
        where: { id: ctx.request.vendorId }
      },
      info
    );
  },
  // async vendorInventory(parent, args, ctx, info) {
  //   const { vendorId } = ctx.request;
  //   if (!vendorId) {
  //     throw new Error("You must be logged in");
  //   }

  //   return ctx.db.query.items({ where: { id_in: args.ids } }, info);
  // },
  async vendorUpdateItemQuery(parent, args, ctx, info) {
    const { vendorId } = ctx.request;
    if (!vendorId) {
      throw new Error("You must be logged in");
    }
    const queriedItem = await ctx.db.query.items(
      { where: { AND: [{ id: args.id }, { vendor: { id: vendorId } }] } },
      info
    );

    if (queriedItem.length === 0) {
      throw new Error(
        `The product id: ${args.id} does not exist in your inventory`
      );
    }

    return queriedItem[0];
  }
};

module.exports = Query;
