import React, { useContext, useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

const Reviews = (props) => {
  const [reviews, setReviews] = useState({
    image: "",
    userName: "",
    review: "",
    rating: 1,
    userId: "",
    productId: "",
  });

  const [reviewsData, setReviewsData] = useState();

  const context = useContext(MyContext);

  useEffect(() => {
    setReviews(() => ({
      ...reviews,
      image: context?.userData?.avatar,
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId,
    }));
    getReviews();
  }, [context?.userData, props]);

  const onChangeInput = (e) => {
    setReviews(() => ({
      ...reviews,
      review: e.target.value,
    }));
  };

  const addReview = (e) => {
    e.preventDefault();

    if (reviews?.review !== "") {
      postData("/api/user/addReview", reviews).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
          setReviews(() => ({
            ...reviews,
            review: "",
            rating: 1,
          }));
          getReviews();
        } else {
          context.alertBox("error", res?.message);
        }
      });
    } else {
      context.alertBox("error", "POR FAVOR ESCRIBA UNA RESEÑA");
    }
  };

  const getReviews = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then(
      (res) => {
        if (res?.error === false) {
          setReviewsData(res.reviews);
          props.setReviewsCount(res.reviews.length);
        }
      },
    );
  };

  return (
    <div className="w-full productReviewsContainer ">
      <h2 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] !font-[500] !mt-2 !ml-3">
        PREGUNTAS Y RESPUESTAS DE LOS CLIENTES
      </h2>

      {reviewsData?.length !== 0 && (
        <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden !mt-5 !pr-5  ">
          {reviewsData?.map((review, index) => {
            return (
              <div
                key={index}
                className="w-full !mb-3 !p-4 bg-white rounded-lg shadow-[3px_3px_3px_#082c55] !border-1"
              >
                <div className="flex gap-3 sm:gap-4 w-full mb-3">
                  <div className="img w-[50px] min-w-[50px] h-[50px] sm:w-[80px] sm:min-w-[80px] sm:h-[80px] overflow-hidden rounded-full border-1 border-[#082c55]">
                    <img
                      src={review?.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row w-full sm:items-start justify-between mb-1">
                      <h4 className="text-[14px] sm:text-[16px] font-bold text-[#082c55] mb-1 sm:mb-0">
                        {review?.userName}
                      </h4>

                      <div className="flex items-center gap-1">
                        <Rating value={review?.rating} readOnly size="small" />
                      </div>
                    </div>

                    <span className="text-[12px] sm:text-[13px] font-bold text-gray-500 block">
                      {review?.createdAt?.split("T")[0]}
                    </span>
                  </div>
                </div>
                <p className="text-[13px] text-[#4e4e4e] break-words whitespace-pre-wrap">
                  {review?.review}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <br />

      <div className="reviewForm bg-[#e6e6e6] text-[#274a72] border-1 border-[#a8a8a8] !p-4 rounded-md">
        <h2 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]">
          AÑADIR UNA RESEÑA
        </h2>

        <form className="w-full !mt-5" onSubmit={addReview}>
          <TextField
            id="outlined-multiline-flexible"
            label="ESCRIBE TU RESEÑA . . . . . . "
            className="w-full bg-[white]"
            onChange={onChangeInput}
            name="review"
            multiline
            rows={5}
            value={reviews.review}
          />
          <br /> <br />
          <Rating
            name="size-small"
            value={reviews.rating}
            onChange={(event, newValue) => {
              setReviews(() => ({
                ...reviews,
                rating: newValue,
              }));
            }}
          />
          <div className="flex items-center !mt-5">
            <Button type="submit" className="btn-org">
              ENVIAR RESEÑA
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
