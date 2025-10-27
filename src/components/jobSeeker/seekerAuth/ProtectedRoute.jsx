import React from "react";

// Design-only ProtectedRoute that simply renders children without auth checks
const ProtectedRoute = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;