import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { profile } from "../../../utils/Api";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [allow, setAllow] = useState(true);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      const role = Cookies.get("role");

      // Allow if not a job seeker or already on the details page
      if (role !== "jobSeeker" || location.pathname === "/user-detail") {
        setAllow(true);
        setChecking(false);
        return;
      }

      try {
        const res = await profile();
        const data = res.data?.data || {};
        const p = data.profile || {};

        // Define completion criteria for job seekers
        const isComplete = Boolean(
          data.name &&
          data.email &&
          p.phone &&
          p.address &&
          p.highestEducation &&
          Array.isArray(p.skills) && p.skills.length > 0
        );

        setAllow(isComplete);
      } catch (err) {
        // If unable to fetch profile for a job seeker, force fill details
        setAllow(false);
      } finally {
        setChecking(false);
      }
    };

    checkProfileCompletion();
    // Re-run when pathname changes
  }, [location.pathname]);

  if (checking) {
    return null;
  }

  if (!allow) {
    return <Navigate to="/user-detail" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;