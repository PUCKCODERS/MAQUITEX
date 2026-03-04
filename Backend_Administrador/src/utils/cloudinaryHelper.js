export const getOptimizedUrl = (url, width = "auto", height = "") => {
  if (!url) return "";

  // Si la imagen no es de Cloudinary, retornamos la URL original
  if (!url.includes("cloudinary.com")) return url;

  // Separamos la URL para inyectar las transformaciones
  const splitUrl = url.split("/upload/");

  // Si la URL no tiene el formato esperado, retornamos la original
  if (splitUrl.length < 2) return url;

  // Definimos las transformaciones base
  // f_auto: Formato automático (WebP/AVIF según el navegador)
  // q_auto: Calidad automática (equilibrio peso/calidad)
  let transformations = ["f_auto", "q_auto"];

  // Si se especifica ancho, lo agregamos con c_limit para no estirar
  if (width !== "auto") {
    transformations.push(`w_${width}`);
    transformations.push("c_limit");
  }

  // Si se especifica alto, lo agregamos
  if (height !== "") {
    transformations.push(`h_${height}`);
  }

  // Reconstruimos la URL: parte1 + /upload/ + transformaciones + / + parte2
  return `${splitUrl[0]}/upload/${transformations.join(",")}/${splitUrl[1]}`;
};

// Nueva función para generar placeholders ultraligeros (Efecto Blur-Up)
export const getTinyPlaceholder = (url) => {
  if (!url || !url.includes("cloudinary.com")) return "";
  // Pedimos una imagen de 30px, calidad 1% y efecto borroso. Pesa menos de 1KB.
  return getOptimizedUrl(url, 30).replace("q_auto", "q_1,e_blur:1000");
};
