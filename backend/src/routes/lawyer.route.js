const express = require('express');

const router = express.Router();

const upload =
require('../middleware/multer');

const lawyercontroller =
require('../controllers/lawyer.controller');

router.post(

  "/lawyerregister",

  upload.fields([

    {
      name:"profilePicture",
      maxCount:1
    },

    {
      name:"governmentIdProof",
      maxCount:1
    },

    {
      name:"lawcertification",
      maxCount:1
    }

  ]),

  lawyercontroller.lawyerregister
);

 router.put("/update/:id",lawyercontroller.lawyerUpdate)
module.exports = router;