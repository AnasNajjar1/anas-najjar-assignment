import Tesseract from "tesseract.js";

/**
 * Handle the file upload and set the image file and preview URI.
 * @param {Event} event - The file upload event.
 * @param {Function} handleError - Function to handle errors.
 * @param {Function} setImgFile - Function to set the image file state.
 * @param {Function} setImgPreviewUri - Function to set the image preview URI state.
 */
export const handleFile = (
  event,
  handleError,
  setImgFile,
  setImgPreviewUri
) => {
  event.preventDefault();
  let files;
  if (event.target.files) files = event.target.files;
  else if (event.dataTransfer.files) files = event.dataTransfer.files;
  else return;
  if (!files || files.length === 0) return;
  if (!files[0].type.match(/^image\/(jpeg|jpg|pjpeg|png)$/)) {
    handleError("Allowed file formats .jpeg .jpg .pjpeg .png");
    return null;
  }
  if (files[0].size > 524288) {
    handleError("Max file size 0.5MB");
    return null;
  }
  setImgFile(files[0]);
  setImgPreviewUri(URL.createObjectURL(files[0]));
};

/**
 * Perform OCR (Optical Character Recognition) on the uploaded image file to extract text.
 * @param {File} imgFile - The image file to be processed.
 * @param {Function} handleError - Function to handle errors.
 * @returns {Promise<string|null>} - The extracted text from the image, or null if an error occurs.
 */
export const performOcr = async (imgFile, handleError) => {
  const result = await Tesseract.recognize(imgFile, "eng", {
    logger: (m) => {},
  });

  if (result.data.text.length > 70) {
    return result.data.text;
  } else {
    handleError("This doesn't seem like an ID Card.");
    return null;
  }
};
