export const getOptimizedUrl = (url, width = "auto", height = "") => {
  if (!url) return "";

  if (!url.includes("cloudinary.com")) return url;

  const splitUrl = url.split("/upload/");
  if (splitUrl.length < 2) return url;

  let transformations = ["f_auto", "q_auto", "c_limit"];

  if (width !== "auto") {
    transformations.push(`w_${width}`);
  }

  if (height !== "") {
    transformations.push(`h_${height}`);
  }

  transformations.push("e_blur:70"); // Placeholder borroso para carga diferida (valor reducido)

  return `${splitUrl[0]}/upload/${transformations.join(",")}/${splitUrl[1]}`;
};

export const getTinyPlaceholder = (url) => {
  if (!url || !url.includes("cloudinary.com")) return "";

  const splitUrl = url.split("/upload/");
  if (splitUrl.length < 2) return url;

  const transformations = ["w_10", "h_10", "q_1", "f_auto"];
  return `${splitUrl[0]}/upload/${transformations.join(",")}/${splitUrl[1]}`;
};
