import { API_PATHS } from './apiPath'; // Ensure this path is correct
import axiosInstance from './axiousInstance'; // Ensure spelling is correct

const uploadImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("No image file provided");
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Ensure your backend returns { imageUrl: "..." }
    const imageUrl = response.data?.imageUrl;

    if (!imageUrl) {
      throw new Error("Image URL not returned from server.");
    }

    return { imageUrl };
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

export default uploadImage;
