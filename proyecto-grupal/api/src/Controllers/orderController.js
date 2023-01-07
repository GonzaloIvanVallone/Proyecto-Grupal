const { Order, User, OrderDetail, Product } = require("../db.js");

const ordersServices = require("../Services/orderService");

const createNewOrder = async (req, res, next) => {
  try {
    let createdOrder;

    const userId = req.body.id;
    console.log(req.body)

    createdOrder = await ordersServices.createNewOrder(
      userId,
      req.body.price,
      req.body.quantity,
      req.body.idMp
    );

     console.log(createdOrder)

    for (let i = 0; i < req.body.pedido.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].title,
        },
      });

      Product.update(
        {
          stock: prodId[0].dataValues.stock - req.body.pedido[i].quantity,
        },
        {
          where: {
            id: prodId[0].dataValues.id,
          },
        }
      );

      const detailOrderCreate = await OrderDetail.create({
        quantity: req.body.pedido[i].quantity,
        price: req.body.price,
        productId: prodId[0].dataValues.id,
        orderId: createdOrder.dataValues.id,
      });
    }

    if (createdOrder) {
      console.log(createdOrder)
      res.status(201).send(createdOrder);
    } else {
      res.status(404).send("Error creating order!");
    }
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await ordersServices.getAllOrders();

    if (allOrders) {
      res.status(201).send(allOrders);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ordById = await ordersServices.getOrderById(id);
    if (ordById) {
      res.status(200).send(ordById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const getOrdersByUser = async (req, res, next) => {
  try {
    const { userid } = req.params
    const userOrders = await ordersServices.getOrdersByUser(userid);
    if (userOrders.length > 0) {
      res.status(200).send(userOrders)
    } else {
      res.status(404).send(`There are no orders to user: ${userid}`)
    }
  } catch (error) {
    console.log('Error in Controller (Orders):', error);
    next(error)
  }
}


const updateOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await ordersServices.getOrders(id);
    !order ? res.status(404).send("There are no orders...") : null;

    for (let i = 0; i < order.dataValues.OrderDetails.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].title,
        },
      });

      Product.update(
        {
          stock:
            prodId[0].dataValues.stock +
            order.dataValues.OrderDetails[i].quantity,
        },
        {
          where: {
            id: order.dataValues.OrderDetails[i].productId,
          },
        }
      );
    }

    order.dataValues.OrderDetails;

    const updated = await Order.update(
      { status: "cancelled" },
      {
        where: {
          id: id,
        },
      }
    );

    let createdOrder;

    const userId = req.body.id;

    createdOrder = await ordersServices.createNewOrder(
      id,
      userId,
      req.body.price,
      req.body.quantity
    );

    for (let i = 0; i < req.body.pedido.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].title,
        },
      });

      Product.update(
        {
          stock: prodId[0].dataValues.stock - req.body.pedido[i].quantity,
        },
        {
          where: {
            id: prodId[0].dataValues.id,
          },
        }
      );

      const detailOrderCreate = await OrderDetail.create({
        quantity: req.body.pedido[i].quantity,
        price: req.body.price,
        productId: prodId[0].dataValues.id,
        orderId: createdOrder.dataValues.id,
      });
    }

    if (createdOrder) {
      const listOrder = await ordersServices.getAllOrders();
      return res.status(200).send(listOrder);
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  console.log("entro");
  const ordId = await Order.findAll({ 
    where: {
      idMp: id,
    },
    attibutes: ["id"]
  });
    console.log(req.body);
    console.log(ordId);
  try {
    const ordById = await ordersServices.orderUpdate(ordId[0].dataValues.id,req.body);
    if (ordById) {
      res.status(200).send(ordById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await ordersServices.getOrders(id);
    !order ? res.status(404).send("There are no orders...") : null;
   
    const destroy = await ordersServices.deleteOrder(id);
    if (destroy) {
      const newlist = await ordersServices.getAllOrders();
      res.status(200).send(newlist);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  updateStatus,
  getOrderById,
  getOrdersByUser,
  deleteOrder,
};
