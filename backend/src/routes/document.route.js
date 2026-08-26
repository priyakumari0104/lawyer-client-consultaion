const express = require("express");
const router = express.Router();

const documentController = require("../controllers/documents.controller");
const upload = require("../middleware/multer");

router.post(
  "/upload",
  upload.single("document"),
  documentController.uploadDocument
);

// Get all documents of a client
router.get("/client/:clientId", documentController.getClientDocuments);

// Get documents of one appointment
router.get(
  "/appointment/:appointmentId",
  documentController.getAppointmentsDocuments
);

// Delete document
router.delete("/:id", documentController.deleteDocuments);

// Get all documents of one case
router.get("/case/:caseId", documentController.getCaseDocuments);

module.exports = router;