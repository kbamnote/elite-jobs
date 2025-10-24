import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import JobHostingDashboard from "./components/jobHosting/HostingDashboard/JobHostingDashboard";
import Home from "./components/jobSeeker/landingPage/Home";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Jobs from "./components/jobSeeker/jobs/Jobs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/dashboard" element={<JobHostingDashboard/>}/>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
