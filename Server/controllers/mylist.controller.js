import MyListModel from "../models/myList.modal.js";

export const addToMyListController = async (request, response) => {
  try {
    const userId = request.userId;
    const {
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
    } = request.body;

    const item = await MyListModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (item) {
      return response.status(400).json({
        message: "ITEM YA EN MI LISTA",
      });
    }

    const myList = new MyListModel({
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
      userId,
    });

    const save = await myList.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "PRODUCTO GUARDADO EN MI LISTA",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteToMyListController = async (request, response) => {
  try {
    const myListItem = await MyListModel.findById(request.params.id);

    if (!myListItem) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "NO SE ENCONTRÓ EL ITEM CON ESTA ID",
      });
    }

    const deletedItem = await MyListModel.findByIdAndDelete(request.params.id);

    if (!deletedItem) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "EL ITEM NO SE ELIMINA",
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      message: "EL ITEM ESTA ELIMINADO DE MI LISTA",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyListController = async (request, response) => {
  try {
    const userId = request.userId;

    const myListItems = await MyListModel.find({
      userId: userId,
    });

    return response.status(200).json({
      error: false,
      success: true,
      data: myListItems,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
