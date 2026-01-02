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

export const totalSalesController = async (request, response) => {
  try {
    const currentYear = new Date().getFullYear();

    const orderList = await OrderModel.find();

    let totalSales = 0;
    let monthlySales = [
      {
        name: "ENERO",
        TotalSales: 0,
      },
      {
        name: "FEBRERO",
        TotalSales: 0,
      },
      {
        name: "MARZO",
        TotalSales: 0,
      },
      {
        name: "ABRIL",
        TotalSales: 0,
      },
      {
        name: "MAYO",
        TotalSales: 0,
      },
      {
        name: "JUNIO",
        TotalSales: 0,
      },
      {
        name: "JULIO",
        TotalSales: 0,
      },
      {
        name: "AGOSTO",
        TotalSales: 0,
      },
      {
        name: "SEPTIEMBRE",
        TotalSales: 0,
      },
      {
        name: "OCTUBRE",
        TotalSales: 0,
      },
      {
        name: "NOVIEMBRE",
        TotalSales: 0,
      },
      {
        name: "DICIEMBRE",
        TotalSales: 0,
      },
    ];

    for (let i = 0; i < orderList.length; i++) {
      totalSales = totalSales + parseInt(orderList[i].totalAmt);
      const str = JSON.stringify(orderList[i]?.createdAt);
      const year = str.substr(1, 4);
      const monthStr = str.substr(6, 8);
      const month = parseInt(monthStr.substr(0, 2));

      if (currentYear == year) {
        if (month === 1) {
          monthlySales[0] = {
            name: "ENERO",
            TotalSales: (monthlySales[0].TotalSales =
              parseInt(monthlySales[0].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 2) {
          monthlySales[1] = {
            name: "FEBRERO",
            TotalSales: (monthlySales[1].TotalSales =
              parseInt(monthlySales[1].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 3) {
          monthlySales[2] = {
            name: "MARZO",
            TotalSales: (monthlySales[2].TotalSales =
              parseInt(monthlySales[2].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 4) {
          monthlySales[3] = {
            name: "ABRIL",
            TotalSales: (monthlySales[3].TotalSales =
              parseInt(monthlySales[3].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 5) {
          monthlySales[4] = {
            name: "MAYO",
            TotalSales: (monthlySales[4].TotalSales =
              parseInt(monthlySales[4].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 6) {
          monthlySales[5] = {
            name: "JUNIO",
            TotalSales: (monthlySales[5].TotalSales =
              parseInt(monthlySales[5].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 7) {
          monthlySales[6] = {
            name: "JULIO",
            TotalSales: (monthlySales[6].TotalSales =
              parseInt(monthlySales[6].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 8) {
          monthlySales[7] = {
            name: "AGOSTO",
            TotalSales: (monthlySales[7].TotalSales =
              parseInt(monthlySales[7].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 9) {
          monthlySales[8] = {
            name: "SEPTIEMBRE",
            TotalSales: (monthlySales[8].TotalSales =
              parseInt(monthlySales[8].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 10) {
          monthlySales[9] = {
            name: "OCTUBRE",
            TotalSales: (monthlySales[9].TotalSales =
              parseInt(monthlySales[9].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 11) {
          monthlySales[10] = {
            name: "NOVIEMBRE",
            TotalSales: (monthlySales[10].TotalSales =
              parseInt(monthlySales[10].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
        if (month === 12) {
          monthlySales[11] = {
            name: "DICIEMBRE",
            TotalSales: (monthlySales[11].TotalSales =
              parseInt(monthlySales[11].TotalSales) +
              parseInt(orderList[i].totalAmt)),
          };
        }
      }
    }

    return response.status(200).json({
      totalSales: totalSales,
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

export const totalUsersController = async (request, response) => {
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
        TotalUsers: 0,
      },
      {
        name: "FEBRERO",
        TotalUsers: 0,
      },
      {
        name: "MARZO",
        TotalUsers: 0,
      },
      {
        name: "ABRIL",
        TotalUsers: 0,
      },
      {
        name: "MAYO",
        TotalUsers: 0,
      },
      {
        name: "JUNIO",
        TotalUsers: 0,
      },
      {
        name: "JULIO",
        TotalUsers: 0,
      },
      {
        name: "AGOSTO",
        TotalUsers: 0,
      },
      {
        name: "SEPTIEMBRE",
        TotalUsers: 0,
      },
      {
        name: "OCTUBRE",
        TotalUsers: 0,
      },
      {
        name: "NOVIEMBRE",
        TotalUsers: 0,
      },
      {
        name: "DICIEMBRE",
        TotalUsers: 0,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.$month === 1) {
        monthlyUsers[0] = {
          name: "ENERO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 2) {
        monthlyUsers[1] = {
          name: "FEBRERO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 3) {
        monthlyUsers[2] = {
          name: "MARZO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 4) {
        monthlyUsers[3] = {
          name: "ABRIL",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 5) {
        monthlyUsers[4] = {
          name: "MAYO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 6) {
        monthlyUsers[5] = {
          name: "JUNIO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 7) {
        monthlyUsers[6] = {
          name: "JULIO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 8) {
        monthlyUsers[7] = {
          name: "AGOSTO",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 9) {
        monthlyUsers[8] = {
          name: "SEPTIEMBRE",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 10) {
        monthlyUsers[9] = {
          name: "OCTUBRE",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 11) {
        monthlyUsers[10] = {
          name: "NOVIEMBRE",
          TotalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.$month === 12) {
        monthlyUsers[11] = {
          name: "DICIEMBRE",
          TotalUsers: users[i].count,
        };
      }
    }

    return response.status(200).json({
      TotalUsers: monthlyUsers,
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
