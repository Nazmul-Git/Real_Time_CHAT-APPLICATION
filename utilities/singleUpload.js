const createHttpError = require("http-errors");
const multer = require("multer");
const path = require("path");

function uploader(subfolderPath, allowFileType, maxfileSize, errorMessage) {
    const uploadFolder = `${__dirname}/../public/uploads/${subfolderPath}`;
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, uploadFolder);
        },
        filename: (req, file, callback) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + '_' + Date.now();
            callback(null, fileName + fileExt);
        }
    })

    const upload = multer({
        storage: storage,
        limits:{
            fileSize: maxfileSize,
        },
        fileFilter:(req, file, callback)=>{
            if(allowFileType.includes(file.mimetype)){
                callback(null, true);
            }else{
                callback(createHttpError(errorMessage));
            }
        }
    })
    return upload;
}

module.exports = uploader;