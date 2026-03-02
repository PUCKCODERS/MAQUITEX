import React from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import ProductZoom from "../ProductZoom";
import ProductDetailsComponent from "../ProductDetails";

const ProductModal = ({ open, handleClose, item }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      className="productDetailsModal"
    >
      <DialogContent>
        <div className="flex flex-col lg:flex-row w-full productDetailsModalContainer relative">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#fff] !absolute !top-[15px] !right-[15px] !bg-[#274a72] hover:!text-[#082c55] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#7994b1] hover:!shadow-[0px_0px_0px_3px_#082c55] z-50"
            onClick={handleClose}
          >
            <IoCloseSharp className="text-[25px]" />
          </Button>

          {item && (
            <>
              <div className="col1 w-full lg:w-[40%] !px-3 !py-4 lg:!py-8">
                <ProductZoom images={item.images} />
              </div>

              <div className="col2 w-full lg:w-[60%] !py-4 lg:!py-8 !px-8 lg:!pr-16 productContent">
                <ProductDetailsComponent item={item} />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
