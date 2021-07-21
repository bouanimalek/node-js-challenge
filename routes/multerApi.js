const express = require('express');
const router = express.Router();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
     cb(null, Date.now() + '--' + file.originalname);
    }
  });
  const upload = multer({storage: fileStorageEngine});
  
  // send single file
  router.post('/single', upload.single('image'),(req, res) => {
    console.log(req.file);
    res.send('single file upload success');
  })

  // send multiple files
  router.post('/multiple', upload.array('images', 3),(req, res) => {
      console.log(req.files);
     res.send('multiple files uploaded successfully');
  })

  module.exports = router;