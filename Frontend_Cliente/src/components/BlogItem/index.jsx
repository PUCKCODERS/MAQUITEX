import React from "react";
import { FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { getOptimizedCloudinaryUrl } from "../../utils/cloudinaryHelper";

const BlogItem = (props) => {
  const hasExternalLink =
    props?.item?.externalLink && props.item.externalLink.trim() !== "";

  const TitleLink = ({ children }) =>
    hasExternalLink ? (
      <a
        href={props.item.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        {children}
      </a>
    ) : (
      <Link to={props.link || "/"} className="link">
        {children}
      </Link>
    );

  const ReadMoreLink = ({ children }) =>
    hasExternalLink ? (
      <a
        href={props.item.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="link font-bold text-[12px] flex items-center !gap-2"
      >
        {children}
      </a>
    ) : (
      <Link
        to={props.link || "/"}
        className="link font-bold text-[12px] flex items-center !gap-2"
      >
        {children}
      </Link>
    );

  return (
    <div className="blogItem group !mr-2">
      <div className="imgWrapper !w-full overflow-hidden rounded-md !border-1 !border-[#b1cdee] shadow-[3px_3px_3px_#274a72] cursor-pointer relative">
        <img
          src={getOptimizedCloudinaryUrl(props?.item?.images[0], {
            width: 450,
          })}
          className="!w-full !h-[150px] transition-all group-hover:scale-105 group-hover:rotate-0"
          alt="blog image"
          loading="lazy"
        />

        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] !z-50 bg-[#556f8d] rounded-md !p-1 text-[15px] font-[500] gap-1">
          <FcOvertime className="text-[20px]" />{" "}
          {props?.item?.createdAt?.split("T")[0]}
        </span>
      </div>

      <div className="info !py-4">
        <h2 className="text-[13px] lg:text-[15px] font-bold  !mb-1 whitespace-normal break-words">
          <TitleLink>{props?.item?.title}</TitleLink>
        </h2>

        <div
          className="text-[11px] lg:text-[13px] font-[400] text-[#6c8199] !mb-3 whitespace-normal break-words"
          dangerouslySetInnerHTML={{
            __html: props?.item?.description?.substr(0, 100) + "...",
          }}
        ></div>

        <ReadMoreLink>
          SEGUIR LEYENDO <BsBoxArrowUpRight className="text-[14px]" />
        </ReadMoreLink>
      </div>
    </div>
  );
};

export default BlogItem;
