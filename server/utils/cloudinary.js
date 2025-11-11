
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//* Cloudinary Upload Image
const cloudinaryUploadImage = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    console.log(error);
                    reject(new Error("Internal Server Error (cloudinary)"));
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(fileBuffer);
    });
}


//* Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {
   try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result
   } 
   catch (error) {
    console.log(error)
    throw new Error("Internal Server Error (cloudinary)");
   }
}


//* Cloudinary Remove Multiple Images
const cloudinaryRemoveMultipleImages = async (publicIds) => { // the parameter will be as array
   try {
    const result = await cloudinary.v2.api.delete_resources(publicIds)
    return result
   } 
   catch (error) {
    console.log(error)
    throw new Error("Internal Server Error (cloudinary)");
   }
}



module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImages
}