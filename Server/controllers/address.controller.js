import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {
  try {
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
      selected,
    } = request.body;

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
      selected,
    });

    const savedAddress = await address.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      { $push: { address_details: savedAddress?._id } }
    );

    return response.status(200).json({
      data: savedAddress,
      message: "DIRECCIÓN AÑADIDA EXITOSAMENTE",
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

export const getAddressController = async (request, response) => {
  try {
    const address = await AddressModel.find({ userId: request?.query?.userId });

    if (!address || address.length === 0) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "DIRECCIÓN NO ENCONTRADA",
      });
    } else {
      const updatetUser = await UserModel.updateOne(
        { _id: request?.query?.userId },
        {
          $push: {
            address: address?._id,
          },
        }
      );
      return response.status(200).json({
        error: false,
        success: true,
        data: address,
      });
    }

    /*return response.status(200).json({
      error: false,
      success: true,
      address: address,
    });*/
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
