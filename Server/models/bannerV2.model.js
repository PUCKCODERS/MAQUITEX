import mongoose from "mongoose";

const bannerV2Schema = new mongoose.Schema(
  {
    bannerTitle: {
      type: String,
      default: "",
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    catId: {
      type: String,
      default: "",
    },
    subCatId: {
      type: String,
      default: "",
    },
    thirdsubCatId: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: "",
      required: true,
    },
    alignInfo: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BannerV2Model = mongoose.model("bannerV2", bannerV2Schema);

export default BannerV2Model;
