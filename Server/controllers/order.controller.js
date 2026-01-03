import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.modal.js";
import UserModel from "../models/user.model.js";
import paypal from "@paypal/checkout-server-sdk";

export const createOrderController = async (request, response) => {
  try {
    let order = new OrderModel({
      userId: request.body.userId,
      products: request.body.products,
      paymentId: request.body.paymentId,
      payment_status: request.body.payment_status,
      delivery_address: request.body.delivery_address,
      totalAmt: request.body.totalAmt,
      date: request.body.date,
    });

    if (!order) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    for (let i = 0; i < request.body.products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        request.body.products[i].productId,
        {
          countInStock: parseInt(
            request.body.products[i].countInStock -
              request.body.products[i].quantity
          ),
        },
        { new: true }
      );
    }

    order = await order.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "PEDIDO REALIZADO",
      order: order,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getOrderDetailsController = async (request, response) => {
  try {
    const userId = request.userId;

    const orderlist = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("delivery_address userId");

    return response.json({
      message: "ORDEN LISTA",
      data: orderlist,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export async function getTotalOrdersCountController(request, response) {
  try {
    const ordersCount = await OrderModel.countDocuments();
    return response.status(200).json({
      error: false,
      success: true,
      count: ordersCount,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

function getPayPalClient() {
  const environment =
    process.env.PAYPAL_MODE === "live"
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID_LIVE,
          process.env.PAYPAL_SECRET_LIVE
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID_TEST,
          process.env.PAYPAL_SECRET_TEST
        );

  return new paypal.core.PayPalHttpClient(environment);
}

export const createOrderPaypalController = async (request, response) => {
  try {
    const req = new paypal.orders.OrdersCreateRequest();
    req.prefer("return=representation");

    req.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: request.query.totalAmount,
          },
        },
      ],
    });

    try {
      const client = getPayPalClient();
      const order = await client.execute(req);
      response.json({ id: order.result.id });
    } catch (error) {
      console.error(error);
      response.status(500).send("ERROR AL CREAR PEDIDO");
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const captureOrderPaypalController = async (request, response) => {
  try {
    const { paymentId } = request.body;

    const req = new paypal.orders.OrdersCaptureRequest(paymentId);
    req.requestBody({});

    const orderInfo = {
      userId: request.body.userId,
      products: request.body.products,
      paymentId: request.body.paymentId,
      payment_status: request.body.payment_status,
      delivery_address: request.body.delivery_address,
      totalAmt: request.body.totalAmt,
      date: request.body.date,
    };

    const order = new OrderModel(orderInfo);
    await order.save();

    for (let i = 0; i < request.body.products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        request.body.products[i].productId,
        {
          countInStock: parseInt(
            request.body.products[i].countInStock -
              request.body.products[i].quantity
          ),
        },
        { new: true }
      );
    }
    return response.status(200).json({
      success: true,
      error: false,
      order: order,
      message: "PEDIDO REALIZADO",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateOrderStatusController = async (request, response) => {
  try {
    const { id, order_status } = request.body;
    const userId = request.userId;

    const updateOder = await OrderModel.updateOne(
      { _id: id },
      { order_status: order_status },
      { new: true }
    );

    return response.json({
      message: "ESTADO DE PEDIDO ACTUALIZADO",
      success: true,
      error: false,
      data: updateOder,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const VENTASController = async (request, response) => {
  try {
    const currentYear = new Date().getFullYear();

    const orderList = await OrderModel.find();

    let VENTAS = 0;
    let monthlySales = [
      {
        name: "ENERO",
        VENTAS: 0,
      },
      {
        name: "FEBRERO",
        VENTAS: 0,
      },
      {
        name: "MARZO",
        VENTAS: 0,
      },
      {
        name: "ABRIL",
        VENTAS: 0,
      },
      {
        name: "MAYO",
        VENTAS: 0,
      },
      {
        name: "JUNIO",
        VENTAS: 0,
      },
      {
        name: "JULIO",
        VENTAS: 0,
      },
      {
        name: "AGOSTO",
        VENTAS: 0,
      },
      {
        name: "SEPTIEMBRE",
        VENTAS: 0,
      },
      {
        name: "OCTUBRE",
        VENTAS: 0,
      },
      {
        name: "NOVIEMBRE",
        VENTAS: 0,
      },
      {
        name: "DICIEMBRE",
        VENTAS: 0,
      },
    ];

    for (let i = 0; i < orderList.length; i++) {
      VENTAS = VENTAS + parseInt(orderList[i].totalAmt);
      const str = JSON.stringify(orderList[i]?.createdAt);
      const year = str.substr(1, 4);
      const monthStr = str.substr(6, 8);
      const month = parseInt(monthStr.substr(0, 2));

      if (currentYear == year) {
        if (month === 1) {
          monthlySales[0] = {
            name: "ENERO",
            VENTAS: (monthlySales[0].VENTAS =
              parseInt(monthlySales[0].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 2) {
          monthlySales[1] = {
            name: "FEBRERO",
            VENTAS: (monthlySales[1].VENTAS =
              parseInt(monthlySales[1].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 3) {
          monthlySales[2] = {
            name: "MARZO",
            VENTAS: (monthlySales[2].VENTAS =
              parseInt(monthlySales[2].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 4) {
          monthlySales[3] = {
            name: "ABRIL",
            VENTAS: (monthlySales[3].VENTAS =
              parseInt(monthlySales[3].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 5) {
          monthlySales[4] = {
            name: "MAYO",
            VENTAS: (monthlySales[4].VENTAS =
              parseInt(monthlySales[4].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 6) {
          monthlySales[5] = {
            name: "JUNIO",
            VENTAS: (monthlySales[5].VENTAS =
              parseInt(monthlySales[5].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 7) {
          monthlySales[6] = {
            name: "JULIO",
            VENTAS: (monthlySales[6].VENTAS =
              parseInt(monthlySales[6].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 8) {
          monthlySales[7] = {
            name: "AGOSTO",
            VENTAS: (monthlySales[7].VENTAS =
              parseInt(monthlySales[7].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 9) {
          monthlySales[8] = {
            name: "SEPTIEMBRE",
            VENTAS: (monthlySales[8].VENTAS =
              parseInt(monthlySales[8].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 10) {
          monthlySales[9] = {
            name: "OCTUBRE",
            VENTAS: (monthlySales[9].VENTAS =
              parseInt(monthlySales[9].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 11) {
          monthlySales[10] = {
            name: "NOVIEMBRE",
            VENTAS: (monthlySales[10].VENTAS =
              parseInt(monthlySales[10].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 12) {
          monthlySales[11] = {
            name: "DICIEMBRE",
            VENTAS: (monthlySales[11].VENTAS =
              parseInt(monthlySales[11].VENTAS) +
              parseInt(orderList[i].totalAmt)),
          };
        }
      }
    }

    return response.status(200).json({
      VENTAS: VENTAS,
      monthlySales: monthlySales,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const USUARIOSController = async (request, response) => {
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    let monthlyUsers = [
      {
        name: "ENERO",
        USUARIOS: 0,
      },
      {
        name: "FEBRERO",
        USUARIOS: 0,
      },
      {
        name: "MARZO",
        USUARIOS: 0,
      },
      {
        name: "ABRIL",
        USUARIOS: 0,
      },
      {
        name: "MAYO",
        USUARIOS: 0,
      },
      {
        name: "JUNIO",
        USUARIOS: 0,
      },
      {
        name: "JULIO",
        USUARIOS: 0,
      },
      {
        name: "AGOSTO",
        USUARIOS: 0,
      },
      {
        name: "SEPTIEMBRE",
        USUARIOS: 0,
      },
      {
        name: "OCTUBRE",
        USUARIOS: 0,
      },
      {
        name: "NOVIEMBRE",
        USUARIOS: 0,
      },
      {
        name: "DICIEMBRE",
        USUARIOS: 0,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.month === 1) {
        monthlyUsers[0] = {
          name: "ENERO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 2) {
        monthlyUsers[1] = {
          name: "FEBRERO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 3) {
        monthlyUsers[2] = {
          name: "MARZO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 4) {
        monthlyUsers[3] = {
          name: "ABRIL",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 5) {
        monthlyUsers[4] = {
          name: "MAYO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 6) {
        monthlyUsers[5] = {
          name: "JUNIO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 7) {
        monthlyUsers[6] = {
          name: "JULIO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 8) {
        monthlyUsers[7] = {
          name: "AGOSTO",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 9) {
        monthlyUsers[8] = {
          name: "SEPTIEMBRE",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 10) {
        monthlyUsers[9] = {
          name: "OCTUBRE",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 11) {
        monthlyUsers[10] = {
          name: "NOVIEMBRE",
          USUARIOS: users[i].count,
        };
      }
      if (users[i]?._id?.month === 12) {
        monthlyUsers[11] = {
          name: "DICIEMBRE",
          USUARIOS: users[i].count,
        };
      }
    }

    return response.status(200).json({
      USUARIOS: monthlyUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
