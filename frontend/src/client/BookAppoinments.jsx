import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/bookappoinment.css";

const BookAppointment = () => {
  const navigate=useNavigate();
  const {lawyerId}=useParams();
  const [isSubmitting,setIsSubmitting]=useState(false);
  const[lawyerName,setLawyerName]=useState("");
  const[formData,setFormData]=useState({
    issueType:"",
    description:"",
  });
  const handleChange=(e)=>{
    setFormData({...formData,
      [e.target.name]:e.target.value,
    });
  };
  useEffect(()=>{
    const fetchLawyerDetails=async ()=>{
      try{
         const res=await axios.get(`http://localhost:3000/api/lawyer/${lawyerId}`);
         if(res.data?.lawyer){setLawyerName(res.data.lawyer.fullName);}
    }catch(error){
      console.log("Could not retrive dynamiclawyer profile metadata, using fallback reference.");
    }
      };
      if(lawyerId){
        fetchLawyerDetails();
      }
  },[lawyerId]);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.issueType||!formData.description.trim){
      alert("Please fill all fields");
      return;
    }
try{
  setIsSubmitting(true);
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user){
    alert("please login first");
    navigate("/login");
    return;
  }
  console.log("USER:", user);
console.log("CLIENT ID:", user._id);
console.log("LAWYER ID:", lawyerId);
  const response=await axios.post("http://localhost:3000/api/appointment/request",
    {
      clientId:user._id,
      lawyerId:lawyerId,
      issueType:formData.issueType,
      description:formData.description,
    }
  );
  alert(response.data.message);
  setFormData({
    issueType:"",
    description:"",
  });
navigate("/client/dashboard");
}catch(error){
console.log(error);
alert(error.response?.data?.message||"failedto submit appointment request.Try again!");
}finally{
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