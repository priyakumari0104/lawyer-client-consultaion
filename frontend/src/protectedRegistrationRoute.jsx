import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRegistrationRoute = ({ children }) => {

    const verificationToken =
        sessionStorage.getItem("verificationToken");

    const verifiedEmail =
        sessionStorage.getItem("verifiedEmail");

    const verifiedPhone =
        sessionStorage.getItem("verifiedPhone");

    if (
        !verificationToken ||
        !verifiedEmail ||
        !verifiedPhone
    ) {
        return (
            <Navigate
                to="/verify-contact"
                replace
            />
        );
    }

    return children;
};

export default ProtectedRegistrationRoute;