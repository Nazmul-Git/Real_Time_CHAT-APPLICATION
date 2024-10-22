const uploader = require("../../utilities/singleUpload");

function avatarUpload(req, res, next){
    const upload = uploader(
        'avatar',
        ['image/jpeg', 'image/jpg', 'image/png'],
        1000000,
        'Only .jpeg, .jpg or .png format are allowed!.'
    );
    upload.any()(req, res, (err)=>{
        if (err) {
            let statusCode = 500; // default to server error

            // Determine the type of error
            if (err.code === 'LIMIT_FILE_SIZE') {
                statusCode = 400; // Bad Request for size limit
            } else if (err.code === 'UNSUPPORTED_MEDIA_TYPE') {
                statusCode = 415; // Unsupported Media Type
            }

            res.status(statusCode).json({
                errors: {
                    avatar: {
                        message: err.message,
                    }
                }
            });
        } else {
            next();
        }
    });
}
module.exports = avatarUpload;