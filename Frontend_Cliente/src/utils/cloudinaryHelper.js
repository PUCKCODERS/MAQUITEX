// Frontend_Cliente/src/utils/cloudinaryHelper.js

/**
 * Creates a very small, blurred placeholder URL for LQIP (Low-Quality Image Placeholder) effect.
 *
 * @param {string} url The original Cloudinary image URL.
 * @returns {string} The URL for a tiny, blurred version of the image.
 */
export const getTinyPlaceholder = (url) => {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return url;
  }
  // This creates a 20px wide image, blurred, with automatic quality.
  const transformations = "w_20,e_blur:100,q_auto,f_auto";

  if (url.includes("/upload/")) {
    return url.replace(/\/upload\//, `/upload/${transformations}/`);
  }
  return url;
};

/**
 * Optimizes a Cloudinary URL by adding or replacing transformations.
 * This function ensures images are delivered in an optimal format, quality, and size.
 *
 * @param {string} url The original Cloudinary image URL.
 * @param {object} [options] Optional parameters for transformations.
 * @param {number} [options.width] The target width of the image.
 * @param {number} [options.height] The target height of the image.
 * @param {string} [options.crop='fill'] The crop mode (e.g., 'fill', 'fit', 'limit', 'scale').
 * @returns {string} The new, optimized image URL.
 */
export const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const { width, height, crop = "limit" } = options;

  // Always apply automatic quality and format for optimization.
  const transformations = ["f_auto", "q_auto"];

  // Add sizing and cropping transformations if dimensions are provided.
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) {
    transformations.push(`c_${crop}`);
  }

  const transformationString = transformations.join(",");

  if (url.includes("/upload/")) {
    // This regex replaces existing transformation segments to avoid conflicts.
    // It looks for /upload/...,.../ where the middle part is a transformation string.
    const regex = /upload\/[a-zA-Z0-9_,]+\//;
    if (regex.test(url)) {
      return url.replace(regex, `upload/${transformationString}/`);
    }
    return url.replace("/upload/", `/upload/${transformationString}/`);
  }

  return url;
};

/**
 * Genera una cadena srcset para imágenes responsivas.
 * Permite al navegador elegir el tamaño ideal según la densidad de pantalla.
 */
export const getCloudinarySrcSet = (
  url,
  widths = [300, 600, 900],
  options = {},
) => {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return null;
  }
  return widths
    .map(
      (w) =>
        `${getOptimizedCloudinaryUrl(url, { ...options, width: w })} ${w}w`,
    )
    .join(", ");
};
