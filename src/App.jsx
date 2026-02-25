import React from "react";
import { Routes, Route } from "react-router-dom";

// Job Seeker Components
import Home from "./components/jobSeeker/landingPage/Home";
import Jobs from "./components/jobSeeker/jobs/Jobs";
import ViewJobs from "./components/jobSeeker/jobs/ViewJobs";
import AboutUs from "./components/jobSeeker/navbarSection/about/AboutUs";
import ContactUs from "./components/jobSeeker/navbarSection/contactUs/ContactUs";
import Salaries from "./components/jobSeeker/navbarSection/salarySection/Salaries";
import Services from "./components/jobSeeker/navbarSection/Services/Services";
import Blog from "./components/jobSeeker/navbarSection/Blog/Blog";
import ATS_Score from "./components/jobSeeker/navbarSection/aiSection/AtsScore";
import AiResume from "./components/jobSeeker/navbarSection/aiSection/AiResume";
import AiMockTest from "./components/jobSeeker/navbarSection/aiSection/mocktest/AiMockTest";
import Profile from "./components/jobSeeker/seekerProfile/Profile";
import Onboarding from "./components/jobSeeker/seekerProfile/Onboarding";
import UserDetails from "./components/jobSeeker/seekerProfile/UserDetails";
import ShowJobs from "./components/jobSeeker/seekerProfile/ShowJobs";

// Job Hosting Components
import HostingProfileDetail from "./components/jobHosting/hostingProfile/HostingProfileDetail";
import HostingProfileForm from "./components/jobHosting/hostingProfile/HostingProfileForm";
import JobHostingOnboarding from "./components/jobHosting/hostingProfile/JobHostingOnboarding";
import PostJob from "./components/jobHosting/postJob/PostJob";
import MyJobs from "./components/jobHosting/myJobs/Myjobs";
import ViewApplicant from "./components/jobHosting/myJobs/ViewApplicant";
import ApplicantProfile from "./components/jobHosting/myJobs/ApplicantProfile";
import JobHostingDashboard from "./components/jobHosting/HostingDashboard/JobHostingDashboard";

// Recruiter Components
import RecruiterPage from "./components/recruiter/main/RecruiterPage";
import RecruiterProfile from "./components/recruiter/profile/RecruiterProfile";
import RecruiterProfileEdit from "./components/recruiter/profile/RecruiterProfileEdit";
import RecruiterApplicantDetail from "./components/recruiter/applicantFullDetail/RecruiterApplicantDetail";
import RecruiterOnboarding from "./components/recruiter/profile/RecruiterOnboarding";

// Common Components
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Header from "./components/jobSeeker/commonSeeker/Header";
import Footer from "./components/jobSeeker/commonSeeker/Footer";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyOTP from "./components/auth/VerifyOTP";
import AddNewPassword from "./components/auth/AddNewPassword";
import GoogleRoleSelection from "./components/auth/GoogleRoleSelection";
import GoogleCallbackHandler from "./components/auth/GoogleCallbackHandler";
import Auth from "./components/auth/Auth";
import ChatBot from "./components/auth/ChatBot";
import NewsBlogSingle from "./components/jobSeeker/landingPage/NewsBlogSingle";
import Resume from "./components/Resume";
import { ResumeIcon } from "./components/auth/resume/ResumeIcon";
import { Resumes } from "./components/auth/resume/Resumes";
import ResumeEditor from "./components/auth/resume/ResumeEditor";
import ResumePreview from "./components/auth/resume/ResumePreview";

function App() {
  return (
    <>
      <Routes>
        {/* Routes with Recruiter Header */}
        <Route
          path="/recruiter/*"
          element={
            <>
              <Routes>
                <Route path="/dashboard" element={<RecruiterPage />} />
                <Route path="/onboarding" element={<RecruiterOnboarding />} />
                <Route path="/profile" element={<RecruiterProfile />} />
                <Route
                  path="/profile/edit"
                  element={<RecruiterProfileEdit />}
                />
                <Route
                  path="/applicant-details/:id"
                  element={<RecruiterApplicantDetail />}
                />
              </Routes>
            </>
          }
        />

        {/* Seeker Auth */}
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/logincode" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/add-new-password" element={<AddNewPassword />} />
        <Route path="/google-role-selection" element={<GoogleRoleSelection />} />
        <Route path="/google-callback" element={<GoogleCallbackHandler />} />

        {/* Routes with Main Header */}
        <Route
          path="*"
          element={
            <>
              <ChatBot />
              <ResumeIcon />
              <Header />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<ViewJobs />} />

                {/* Job Seeker Pages */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<NewsBlogSingle />} />
                <Route path="/salaries" element={<Salaries />} />
                <Route path="/ats-score-checker" element={<ATS_Score />} />
                <Route path="/ai-resume-builder" element={<AiResume />} />
                <Route path="/mock" element={<AiMockTest />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/resumes" element={<Resumes />} />
                <Route path="/resumes/edit" element={<ResumeEditor />} />
                <Route path="/resumes/preview" element={<ResumePreview />} />

                {/* Seeker Profile */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/user-detail" element={<UserDetails />} />
                <Route path="/my-jobs" element={<ShowJobs />} />

                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Job Hosting Profile */}
        <Route path="/hosting/profile/edit" element={<HostingProfileDetail />} />
        <Route path="/hosting/profile" element={<HostingProfileForm />} />
        <Route path="/hosting/onboarding" element={<JobHostingOnboarding />} />
        <Route path="/hosting/dashboard" element={<JobHostingDashboard />} />
        {/* Job Hosting Jobs */}
        <Route path="/hosting/post-job" element={<PostJob />} />
        <Route path="/hosting/my-jobs" element={<MyJobs />} />
        <Route path="/hosting/applicants/:id" element={<ViewApplicant />} />
        <Route
          path="/hosting/applicants/:jobId/:id"
          element={<ApplicantProfile />}
        />
      </Routes>
    </>
  );
}

export default App;



{/* <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
  <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" stroke-width="2"/>
  <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="2"/>
  <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" stroke-width="2"/>
  <path d="M15 14l4 4" stroke="currentColor" stroke-width="2"/>
  <path d="M17 12v4h4" stroke="currentColor" stroke-width="2"/>
</svg> */}

// resume builder icon