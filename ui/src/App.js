import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Login } from "./components/login/login";
import { Forms } from "./components/forms/forms";
import { Navbar } from "./components/navbar";
import { Data } from "./components/data/data";
import { History } from "./components/history/history";
import { VehicleContext } from "./components/VehicleContext";
import { useCookies } from "react-cookie";

export const App = () => {
  const [visitorDetails, setVisitorDetails] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "user"]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [token, setToken] = useState(null);
 

  const userDomain = "localhost"
  const API = "http://localhost:8080/api";
  useEffect(() => {
    fetch(API, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setVisitorDetails(json));
  }, []);

  useMemo(() => {
    if (cookies.user) {
      setUser(cookies);
    }
  }, [cookies]);
  console.log('cookies', cookies)

  const obj = {
    visitorDetails,
    setVisitorDetails,
    API,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    setToken,
    token,
    cookies,
    setCookie,
    removeCookie,
    userDomain,
  };

  
  if(!user){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    )
  }
  // if (user === null) {
  //   return (
  //     <VehicleContext.Provider value={obj}>
  //       <Router>
  //         <Routes>
  //           <Route path="/" element={<Login />} />
  //           <Route path="*" element={<Login />} />
  //         </Routes>
  //       </Router>
  //     </VehicleContext.Provider>
  //   );
  // } else {

  return (
    <VehicleContext.Provider value={obj}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/vehicles" element={<Forms />} />
          <Route path="/" element={<Login />} />

          <Route path="/data" element={<Data />} />
          <Route path="/History" element={<History />} />
          <Route path="*" element={<Forms />} />

          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </Router>
    </VehicleContext.Provider>
  );
};
