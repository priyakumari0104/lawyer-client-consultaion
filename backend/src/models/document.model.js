const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    lawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },

    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: false,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
    },

    documentType: {
      type: String,
      enum: [
        "identity",
        "evidence",
        "case_document",
        "agreement",
        "other",
      ],
      default: "other",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", documentSchema);