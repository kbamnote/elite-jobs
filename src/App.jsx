import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import JobHostingDashboard from "./components/jobHosting/HostingDashboard/JobHostingDashboard";
import Home from "./components/jobSeeker/landingPage/Home";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Jobs from "./components/jobSeeker/jobs/Jobs";
import ViewJobs from "./components/jobSeeker/jobs/ViewJobs";
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

// Job Hosting Components
import HostingLogin from "./components/jobHosting/hostingAuth/HostingLogin";
import HostingSignup from "./components/jobHosting/hostingAuth/HostingSignup";
import HostingProfileDetail from "./components/jobHosting/hostingProfile/HostingProfileDetail";
import HostingProfileForm from "./components/jobHosting/hostingProfile/HostingProfileForm";
import PostJob from "./components/jobHosting/postJob/PostJob";
import MyJobs from "./components/jobHosting/myJobs/Myjobs";
import ViewApplicant from "./components/jobHosting/myJobs/ViewApplicant";
import ApplicantProfile from "./components/jobHosting/myJobs/ApplicantProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/jobs/:id" element={<ViewJobs/>}/>
        <Route path="/dashboard" element={<JobHostingDashboard/>}/>
        
        {/* Job Hosting Routes */}
        <Route path="/hosting/login" element={<HostingLogin />} />
        <Route path="/hosting/signup" element={<HostingSignup />} />
        <Route path="/hosting/profile" element={<HostingProfileDetail />} />
        <Route path="/hosting/profile/edit" element={<HostingProfileForm />} />
        <Route path="/hosting/post-job" element={<PostJob />} />
        <Route path="/hosting/my-jobs" element={<MyJobs />} />
        <Route path="/hosting/applicants/:jobId" element={<ViewApplicant />} />
        <Route path="/hosting/applicant/:applicantId" element={<ApplicantProfile />} />
        
        {/* Job Seeker Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/salaries" element={<Salaries />} />
        <Route path="/ats-score-checker" element={<ATS_Score />} />
        <Route path="/ai-resume-builder" element={<AiResume />} />
        <Route path="/mock" element={<AiMockTest />} />
        
        {/* Seeker Auth */}
        <Route path="/seeker/login" element={<SeekerLogin />} />
        <Route path="/seeker/signup" element={<SeekerSignup />} />
        
        {/* Seeker Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-detail" element={<UserDetails />} />
        <Route path="/my-jobs" element={<ShowJobs />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;