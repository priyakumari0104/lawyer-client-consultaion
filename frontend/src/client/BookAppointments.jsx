
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/bookAppoinments.css";

const BookAppointment = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lawyerName, setLawyerName] = useState("Selected Practitioner"); // Dynamic fallback
const[selectedFiles,setSelectedFiles]=useState([]);
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
  });

  // OPTIONAL REAL-TIME HOOK: Fetch the practitioner's details to personalize the summary card
  useEffect(() => {
    const fetchLawyerDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/lawyer/${lawyerId}`);
        if (res.data?.name) setLawyerName(res.data.name);
      } catch (err) {
        console.warn("Could not retrieve dynamic lawyer profile metadata, using fallback reference.");
      }
    };
    if (lawyerId) fetchLawyerDetails();
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
      alert("Please populate all requested fields.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user || !user._id) {
        alert("Session expired. Please log in to complete authorization.");
        navigate("/login");
        return;
      }

      setIsSubmitting(true);

      const res = await axios.post(
        
        `${import.meta.env.VITE_BASE_URL}/api/appointment/request`,
        {
          clientId: user._id,
          lawyerId,
          issueType: formData.issueType,
          description: formData.description,
        }
      );
      console.log("Appointments response",res.data);
      const appointment=res.data.appoinment;
      console.log("case id",appointment.caseId);
      console.log("appointments cretad",appointment)
      // upload documents logic
      if(selectedFiles.length>0){
        for(const file of selectedFiles){
            const uploadData= new FormData();
            uploadData.append("document",file);
            uploadData.append("clientId",appointment.clientId);
            uploadData.append("lawyerId",appointment.lawyerId);
            uploadData.append("appointmentId",appointment._id)
            uploadData.append("caseId",appointment.caseId);
            uploadData.append("documentTYPE","evidence");
            for(const pair of uploadData.entries()){
              console.log(pair[0],pair[1]);
            }
            const uploadresource=await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/document/upload`,uploadData
            );
            console.log("file uploaded succesfully",uploadresource.data);
        }
        
      }

      alert(res.data.message || "Consultation requested successfully!");
      navigate("/client/appointments");
    } catch (error) {
      console.error(error.response?.data||error);
      alert(error.response?.data?.message || "Booking request failed. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <Link to="/find-lawyers" className="back-link-btn">
        ← Return to Directory
      </Link>

      <div className="booking-card-premium">
        <div className="booking-header">
          <h1>Request Consultation with {lawyerName}</h1>
          <p className="subtitle">
            Provide preliminary case parameters. Your case context will be reviewed privately to ensure there are no legal conflicts of interest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          
          {/* CATEGORY FIELD DROPDOWN */}
          <div className="form-group">
            <label htmlFor="issueType" className="field-label">Primary Legal Category</label>
            <div className="select-wrapper">
              <select
                id="issueType"
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                required
                className="form-select-field"
              >
                <option value="" disabled hidden>Select your legal issue category...</option>
                <option value="Criminal Defense">Criminal Matter / Defense</option>
                <option value="Corporate / Business">Corporate & Commercial Law</option>
                <option value="Family / Matrimonial">Family & Matrimonial Disputes</option>
                <option value="Property / Real Estate">Property & Real Estate Transaction</option>
                <option value="Labor / Employment">Labor & Employment Arbitration</option>
                <option value="Intellectual Property">Intellectual Property Rights (IPR)</option>
              </select>
            </div>
          </div>

          {/* PARAGRAPH BRIEF ANALYSIS FIELD */}
          <div className="form-group">
            <div className="label-row-spacing">
              <label htmlFor="description" className="field-label">Brief Summary of the Dispute / Case</label>
              <span className="char-counter">{formData.description.length} / 1500 chars</span>
            </div>
            <textarea
              id="description"
              name="description"
              placeholder="Provide a clear factual context, date benchmarks, or active legal status so your practitioner can run a conflict check..."
              value={formData.description}
              onChange={handleChange}
              rows="6"
              maxLength="1500"
              required
              className="form-textarea-field"
            />
            <div className="field-helper-text">
              Limit details to essential facts. Confidential elements are protected under secure attorney-client privilege guidelines.
            </div>
          </div>
          {/* file upload system */}
          <label> Attach Documents (optional)</label>
          <input type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          onChange={(e)=>{
            setSelectedFiles(Array.from(e.target.files));
          }}/>
          {selectedFiles.length>0 && (<div>
            <p> Selected files:</p>
            {selectedFiles.map((file,index)=>(
              <p key={index}>{file.name}</p>
            ))}
          </div>)}

          {/* SUBMIT COMPONENT EXECUTION PANEL */}
          <div className="booking-actions">
            <button 
              type="submit" 
              className={`submit-request-btn ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Transmitting Profile Brief..." : "🔒 Submit Consultation Request"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookAppointment;