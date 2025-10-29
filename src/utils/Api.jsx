import axios from "axios";
import Cookies from "js-cookie";

// Base URL - Update this to your backend URL
const BASE_URL = import.meta.env.VITE_API_URL || "https://elite-jobs-backend.onrender.com";

const Api = axios.create({
  baseURL: BASE_URL,
});

const Apiauth = axios.create({
  baseURL: BASE_URL,
});

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

// ============== AUTH ==============
export const signup = (post) => Apiauth.post("/auth/signup", post);
export const login = (post) => Apiauth.post("/auth/login", post);

// ============== Profile GET for Seeker & Hoster ==============
export const profile = () => Api.get("/auth/profile");

// ============== Profile Update for Seeker & Hoster ==============
export const updateProfile = (formData) => Api.patch("/auth/profile", formData);

// ============== Uploading resume and photo of Seeker ==============
export const uploadFileSeeker = (formData) =>
  Api.post("/auth/profile/upload-multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Uploading companyLogo and photo of Hoster ==============
export const uploadFileHoster = (formData) =>
  Api.post("/auth/profile/upload-multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating Seeker photo ==============
export const updatephotoSeeker = (formData) =>
  Api.put("/auth/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating company photo ==============
export const updatephotoCompany = (formData) =>
  Api.put("/auth/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating Seeker resume ==============
export const updateresumeSeeker = (formData) =>
  Api.put("/auth/profile/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Updating Company logo ==============
export const updateCompanyLogo = (formData) =>
  Api.put("/auth/profile/company-logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Account Delete for Seeker & Hoster ==============
export const accountDelete = () => Api.delete("/jobs/account");

// ============== All Jobs GET ==============
export const allJobs = () => Api.get("/jobs");
export const jobsById = (id) => Api.get(`/jobs/${id}`);


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