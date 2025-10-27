import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import JobHostingDashboard from "./components/jobHosting/HostingDashboard/JobHostingDashboard";
import Home from "./components/jobSeeker/landingPage/Home";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Jobs from "./components/jobSeeker/jobs/Jobs";
import AboutUs from "./components/jobSeeker/navbarSection/about/AboutUs";
import ContactUs from "./components/jobSeeker/navbarSection/contactUs/ContactUs";
import Salaries from "./components/jobSeeker/navbarSection/salarySection/Salaries";
import ATS_Score from "./components/jobSeeker/navbarSection/aiSection/AtsScore";
import AiResume from "./components/jobSeeker/navbarSection/aiSection/AiResume";
import AiMockTest from "./components/jobSeeker/navbarSection/aiSection/mocktest/AiMockTest";
import SeekerLogin from "./components/jobSeeker/seekerAuth/Login";
import SeekerSignup from "./components/jobSeeker/seekerAuth/Signup";
import Profile from "./components/jobSeeker/seekerProfile/Profile";
import UserDetails from "./components/jobSeeker/seekerProfile/UserDetails";
import ShowJobs from "./components/jobSeeker/seekerProfile/ShowJobs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/dashboard" element={<JobHostingDashboard/>}/>
        {/* New design-only pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/salaries" element={<Salaries />} />
        <Route path="/ats-score-checker" element={<ATS_Score />} />
        <Route path="/ai-resume-builder" element={<AiResume />} />
        <Route path="/mock" element={<AiMockTest />} />
        {/* Seeker Auth (design-only) */}
        <Route path="/seeker/login" element={<SeekerLogin />} />
        <Route path="/seeker/signup" element={<SeekerSignup />} />
        {/* Seeker Profile (design-only) */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-detail" element={<UserDetails />} />
        <Route path="/my-jobs" element={<ShowJobs />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
