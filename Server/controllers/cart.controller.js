import CartProductModel from "../models/cartproduct.model.js";

export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const {
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      quantity,
      subTotal,
      productId,
      countInStock,
      discount,
      size,
      weight,
      ram,
      brand,
    } = request.body;

    if (!productId) {
      return response.status(402).json({
        message: "PROPORCIONAR ID DEL PRODUCTO",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return response.status(400).json({
        message: "PRODUCTO YA EN EL CARRITO",
      });
    }

    const cartItem = new CartProductModel({
      productTitle: productTitle,
      image: image,
      rating: rating,
      price: price,
      oldPrice: oldPrice,
      quantity: quantity,
      subTotal: subTotal,
      productId: productId,
      countInStock: countInStock,
      discount: discount,
      size: size,
      weight: weight,
      ram: ram,
      brand: brand,
      userId: userId,
    });

    const save = await cartItem.save();

    return response.status(200).json({
      data: save,
      message: "PRODUCTO AÑADIDO EXITOSAMENTE",
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

export const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    const cartItems = await CartProductModel.find({
      userId: userId,
    });

    return response.json({
      data: cartItems,
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

export const updateCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty, subTotal } = request.body;

    if (!_id || !qty) {
      return response.status(400).json({
        message: "PROPORCIONAR ID, Y CANTIDAD",
      });
    }

    const updateCartitem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
        subTotal: subTotal,
      },
      { new: true }
    );

    return response.json({
      message: "CARRITO ACTUALIZADO",
      success: true,
      error: false,
      data: updateCartitem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: "PROPORCIONAR _id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: id,
      userId: userId,
    });

    if (!deleteCartItem) {
      return response.status(404).json({
        message: "NO SE ENCUENTRA EL PRODUCTO EN EL CARRITO",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "PRODUCTO ELIMINADO",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, size, weight, ram } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "PROPORCIONAR ID DEL ITEM",
        error: true,
        success: false,
      });
    }

    const updateData = {};
    if (size !== undefined) updateData.size = size;
    if (weight !== undefined) updateData.weight = weight;
    if (ram !== undefined) updateData.ram = ram;

    const updateCartItem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      updateData,
      { new: true }
    );

    return response.json({
      message: "ITEM ACTUALIZADO",
      success: true,
      error: false,
      data: updateCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const emptyCartController = async (request, response) => {
  try {
    const userId = request.userId;

    await CartProductModel.deleteMany({ userId: userId });

    return response.status(200).json({
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
