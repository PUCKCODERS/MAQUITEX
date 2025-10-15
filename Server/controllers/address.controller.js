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
    } = request.body;

    console.log("userId recibido:", userId);

    // Validación simple y segura del userId
    if (!userId || typeof userId !== "string") {
      return response.status(400).json({
        message: "El userId no es válido o no se recibió.",
        error: true,
        success: false,
      });
    }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status: Boolean(status),
      userId: userId || "",
    });

    const savedAddress = await address.save();

    await UserModel.updateOne(
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
    console.error("Error en addAddressController:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
