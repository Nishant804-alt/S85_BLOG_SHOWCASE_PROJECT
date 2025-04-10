// // src/context/AuthContext.jsx
// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/auth/verify", { withCredentials: true })
//       .then(() => setIsAuthenticated(true))
//       .catch(() => setIsAuthenticated(false));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
