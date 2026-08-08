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

 router.put("/update/:id",lawyercontroller.lawyerUpdate);
<<<<<<< HEAD
 
 router.get("/verified-lawyer",lawyercontroller.verifiedlawyers);
 router.get("/:id",lawyercontroller.lawyerById);
 router.get("/dashboard/:lawyerId",lawyercontroller.lawyerdashboard);
=======
 router.get("/all",lawyercontroller.getAllLawyers);
>>>>>>> 82e187e27560d9cec6b52e8c488b9edb321aa33b
module.exports = router;