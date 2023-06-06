import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const cloudinaryUploadFile = async (file: Blob | undefined) => {
  if (!file) return null
  const timestamp = Math.round((new Date).getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
    folder: 'images-choices'
  }, cloudinary.config().api_secret || '');

  try {
    const uploadFormData = new FormData()
    uploadFormData.append("file", file);
    uploadFormData.append("api_key", cloudinary.config().api_key || '');
    uploadFormData.append("timestamp", `${timestamp}`);
    uploadFormData.append("signature", signature);
    uploadFormData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
    uploadFormData.append("folder", "images-choices");

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, uploadFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    throw new Error('Impossible to Upload this File')
  }
}