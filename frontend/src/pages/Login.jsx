import React, { useState } from "react";
import "../styles/register.css";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
const Login = () => {
  
 const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   const [loading,setLoading]=useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const   handleSubmit =  async (e) => {
    e.preventDefault();
     try{
      setLoading(true);
       const res=  await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,formData);
       localStorage.setItem("token",res.data.token);
       localStorage.setItem("user",JSON.stringify(res.data.user));
       setLoading(false);
       alert(res.data.message);
       if(res.data.role==="client"){
         navigate("/client/dashboard");
       }else if(res.data.role==="lawyer"){
        navigate("/lawyer/dashboard");
       }else if(res.data.role==="admin"){
        navigate("/admin/dashboard");
       }
      }
catch(err){
  console.log(err);
       setLoading(false);

  alert(err.response?.data?.message);
}finally{
  setLoading(false);
}
  }
   

  return (
    <div className="register-container">

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="register-card">
<h1>JurisDesk</h1>
        <h1>Login</h1>
        <p>Welcome back </p>

        <form onSubmit={handleSubmit}>

          <input
            className="full-width"
            type="email"
            name="email"
            placeholder="Enter Email "
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="full-width"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

         <button
  type="submit"
  disabled={loading}
  className={loading ? "btn-disabled" : "btn-primary"}
>
  {loading ? "Submitting..." : "Submit Request"}
</button>

<Link
    className="login-text"
    to="/role-select"
  >
    Don&apos;t have an account? Register
  </Link>
        </form>

      </div>
      
  

    </div>
  );
};

export default Login;
