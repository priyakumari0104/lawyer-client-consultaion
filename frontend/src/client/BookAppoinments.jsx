import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/bookappoinment.css";

const BookAppointment = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lawyerName, setLawyerName] = useState("");

  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
  });

  useEffect(() => {
    const fetchLawyerDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/lawyer/${lawyerId}`
        );

        if (res.data?.lawyer?.fullName) {
          setLawyerName(res.data.lawyer.fullName);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (lawyerId) {
      fetchLawyerDetails();
    }
  }, [lawyerId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.issueType || !formData.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/request`,
        {
          clientId: user._id,
          lawyerId: lawyerId,
          issueType: formData.issueType,
          description: formData.description,
        }
      );

      alert(response.data.message);

      setFormData({
        issueType: "",
        description: "",
      });

      navigate("/client/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to submit appointment request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <Link to="/client/find-lawyers" className="back-link-btn">
        ← Return to Directory
      </Link>

      <div className="booking-card-premium">
        <div className="booking-header">
          <h1>Request Consultation with {lawyerName}</h1>

          <p className="subtitle">
            Provide preliminary case parameters for review.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Primary Legal Category</label>

            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              <option value="Criminal Defense">
                Criminal Matter / Defense
              </option>

              <option value="Corporate / Business">
                Corporate & Commercial Law
              </option>

              <option value="Family / Matrimonial">
                Family & Matrimonial Disputes
              </option>

              <option value="Property / Real Estate">
                Property & Real Estate
              </option>

              <option value="Labor / Employment">
                Labor & Employment
              </option>

              <option value="Intellectual Property">
                Intellectual Property
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Case Description</label>

            <textarea
              name="description"
              rows="6"
              placeholder="Describe your legal issue..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-actions">
            <button
              type="submit"
              className="submit-request-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Consultation Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;