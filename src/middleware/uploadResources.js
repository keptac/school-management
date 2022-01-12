const multer = require('multer');

var fs = require('fs');

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        var dir = __dirname + '/../../uploads/'+req.body.subjectCode;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

let upload = multer({ storage: storage }).array('vividlearn',15);

module.exports = upload;