const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
// filefiletFunction
function fileFilterFunction(req, file, cb) {
  //console.log(file);
  const extension = path.extname(file.originalname);
  // console.log(extension);
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error('max files') , false);
  }
 // cb(null, allowedExtensions.includes(extension));
}
const maxSize = 1 * 1024 * 1024;
const upload = multer({
  storage: fileStorageEngine,
  limits: {fileSize: maxSize, files: 3},
  fileFilter: fileFilterFunction,
});

// send single file
router.post("/single", upload.single("image"), (req, res) => {
  //console.log(req.file);
  if (req.file !== undefined) {
    res.json({ message: "single file upload success" });
  } else {
    res.status(400).json({ message: "file did not upload" });
  }
});

const upload2 = upload.single('image');
// send single file V2
router.post("/singleV2", (req, res) => {
  //console.log(req.file);
  upload2(req, res, (err)=>{
   if(err instanceof multer.MulterError){
     console.log(err);
     res.status(400).json({ message: "file did not upload" });
   }else if(err){
    res.status(400).json({ message: "erreur" });
   }else{
    res.json({ message: "file uploaded succuessfully" });
   }
   
  })
});

// send multiple files
router.post("/multiple", upload.array("images", 3), (req, res) => {
  //console.log(req.files.length);
  if(req.files === undefined ){
    res.status(401).json({ message: "Chose a file to upload!" });
  // }else if(req.files.length > 3){
  //   res.status(401).json({message: 'You exceeded the max of images to be uploaded!'});
  }else{
    res.status(200).json({ message: "multiple files uploaded successfully" });
  }
  
});

module.exports = router;
