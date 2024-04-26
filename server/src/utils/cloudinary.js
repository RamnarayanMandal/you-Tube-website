import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          

          
cloudinary.config({ 
  cloud_name: 'ramnaryanmandal', 
  api_key: '532371927281939', 
  api_secret: 'wxXqwvToVqsYrOiYGz9Y8-PL5yY' 
});

const uploadOnCloudiner = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file on Cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        // Remove the locally saved temporary file as the upload operation failed 
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            } else {
                console.log("Local file deleted successfully");
            }
        });
        return null;
    }
};
export {uploadOnCloudiner}