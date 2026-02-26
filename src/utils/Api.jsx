import axios from "axios";
import Cookies from "js-cookie";

// Base URL - Update this to your backend URL
const BASE_URL = import.meta.env.VITE_API_URL || "https://api.eliteindiajobs.in";

const Api = axios.create({
  baseURL: BASE_URL,
});

const Apiauth = axios.create({
  baseURL: BASE_URL,
});

const ApiContact = axios.create({
  baseURL: 'https://api.eliteindiajobs.in'
})

Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ============== Enquiry ==============
export const enquiry = (detail) => {
  return ApiContact.post("/contact", detail);
}

// ============== AUTH ==============
export const signup = (post) => Apiauth.post("/auth/signup", post);
export const login = (post) => Apiauth.post("/auth/login", post);
export const googleSignup = (post) => Apiauth.post("/auth/google-signup", post);
export const googleLogin = (post) => Apiauth.post("/auth/google-login", post);
export const forgotPassword = (post) => Apiauth.post("/auth/forgot-password", post);
export const verifyOTP = (post) => Apiauth.post("/auth/verify-otp", post);
export const resetPassword = (post) => Apiauth.post("/auth/reset-password", post);
export const resendOTP = (post) => Apiauth.post("/auth/resend-otp", post);

// ============== Profile GET for Seeker, Hoster and Recruiter ==============
export const profile = () => Api.get("/auth/profile");

// ============== Profile Update for Seeker, Hoster and Recruiter ==============
export const updateProfile = (formData) => Api.put("/auth/profile", formData);

// ============== Uploading resume and photo of Seeker ==============
export const uploadFileSeeker = (formData) =>
  Api.post("/auth/upload-multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Uploading companyLogo, photo and companyDocument of Hoster and Recruiter ==============
export const uploadFileHoster = (formData) =>
  Api.post("/auth/upload-multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating Seeker photo ==============
export const updatephotoSeeker = (formData) =>
  Api.put("/auth/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating company photo for Hoster and Recruiter ==============
export const updatephotoCompany = (formData) =>
  Api.put("/auth/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating company document for Hoster and Recruiter ==============
export const updateCompanyDocs = (formData) =>
  Api.put("/auth/profile/company-document", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating Seeker resume ==============
export const updateresumeSeeker = (formData) =>
  Api.put("/auth/profile/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating Company logo for Hoster and Recruiter ==============
export const updateCompanyLogo = (formData) =>
  Api.put("/auth/profile/company-logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Account Delete for Seeker & Hoster ==============
export const accountDelete = () => Api.delete("/jobs/account");

// ============== All Jobs GET ==============
export const allJobs = (params = {}) => Api.get("/jobs", { params });
export const jobsById = (id) => Api.get(`/jobs/${id}`);

// ============== All categories GET ==============
export const allCategories = () => Api.get("/jobs/categories");

// ============== All companies GET ==============
export const getAllCompanies = () => Api.get("/jobs/companies");

// ============== All filter options GET ==============
export const getAllFilterOptions = () => Api.get("/jobs/filter-options");

// ============== Job apply for Seeker ==============
export const jobApply = (id, formData) => Api.post(`/jobs/${id}/apply`, formData);

// ============== Seeker Applied Jobs ==============
export const appliedJobs = () => Api.get("/jobs/applications/my");

// ============== Hoster Application details of job they applied ==============
export const applicantDetail = (id) => Api.get(`/jobs/${id}/applications`);

// ============== Hoster Application details of job they applied by Id ==============
export const applicantDetailById = (jobId, applicationId) => Api.get(`/jobs/${jobId}/applications/${applicationId}`);

// ============== Updating Applicant Status ['pending', 'reviewed', 'interview', 'accepted', 'rejected']==============
export const applicantStatus = (id, formData) => Api.patch(`/jobs/applications/${id}/status`, formData);

// ============== Job Creation for Hoster ==============
export const createJob = (formData) => Api.post("/jobs", formData);

// ============== Get User's Posted Jobs (Hoster) ==============
export const getHosterJobs = () => Api.get("/jobs/my");


// ============== Get Hoster job stats for graph ==============
export const getJobStats = () => Api.get("/jobs/stats");

// ============== Delete Job (Hoster) ==============
export const deleteJob = (id) => Api.delete(`/jobs/${id}`);

// ============== Delete User Account ==============
export const deleteAccount = () => Api.delete("/jobs/account");

// ============== All Applicant GET for Recruiter ==============
export const allapplicant = (params = {}) => Api.get("/recruiter/applicants/filter", { params });

// ============== All Applicant GET by Id for Recruiter ==============
export const allapplicantById = (id) => Api.get(`/recruiter/jobseekers/${id}`);

// ============== Filter Applicants for Recruiter ==============
// export const filterApplicants = (params = {}) => Api.get("/recruiter/applicants/filter", { params });

const API_URL = "https://eliteassociate1.app.n8n.cloud/webhook/generate"; // change if needed

export const formatResume = async (payload) => {
  const response = await axios.post(API_URL, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// ============== AI Mock Test API ==============
const MOCK_TEST_API_URL = "https://eliteassociate1.app.n8n.cloud/webhook/mock-test";

export const getMockTestQuestions = async (payload) => {
  const response = await axios.post(MOCK_TEST_API_URL, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};