import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LineChart from "./graphs/LineChart";
import PieChart from "./graphs/PieChart";
import JobApplications from "./table/JobApplications";
import HostSidebar from "../commonHost/jobHostingSidebar";
import { getHosterJobs, getJobStats, applicantDetail } from "../../../utils/Api";
import {
  Building2,
  Users,
  Clock,
  Eye,
  CalendarCheck,
  UserCheck,
  CircleX,
  CirclePlus,
  Search,
} from "lucide-react";

const JobHostingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplicants: 0,
    pending: 0,
    reviewed: 0,
    interview: 0,
    accepted: 0,
    rejected: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobStats, setJobStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs
      const jobsResponse = await getHosterJobs();
      
      // Fetch job statistics
      const statsResponse = await getJobStats();
      
      if (jobsResponse.data.success) {
        setJobs(jobsResponse.data.data.jobs);
        setFilteredJobs(jobsResponse.data.data.jobs);
      }
      
      // Initialize status counts
      let statusCounts = {
        pending: 0,
        reviewed: 0,
        interview: 0,
        accepted: 0,
        rejected: 0
      };
      
      // Calculate total applicants and status breakdown
      let totalApps = 0;
      
      if (jobsResponse.data.success) {
        // Fetch applications for each job to get status counts
        for (const job of jobsResponse.data.data.jobs) {
          try {
            const appResponse = await applicantDetail(job._id);
            if (appResponse.data.success) {
              totalApps += appResponse.data.data.length;
              
              // Count applications by status
              appResponse.data.data.forEach(app => {
                if (app.status in statusCounts) {
                  statusCounts[app.status]++;
                } else {
                  statusCounts.pending++; // Default to pending if status is unknown
                }
              });
            }
          } catch (err) {
            console.error(`Error fetching applications for job ${job._id}:`, err);
          }
        }
      }
      
      if (statsResponse.data.success) {
        // Set job stats for charts
        setJobStats(statsResponse.data.data.jobStats);
      }
      
      setStats({
        totalApplicants: totalApps,
        ...statusCounts
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const handleJobClick = (jobId) => {
    // Navigate to the My Jobs page with the specific job
    navigate(`/hosting/my-jobs`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
    {/* Sidebar */}
    <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0 z-50">
      <HostSidebar />
    </div>
  
    {/* Overlay for mobile sidebar */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}
  
    {/* Main Content */}
    <main className="w-full lg:ml-80 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-2xl text-center lg:text-left w-full sm:text-3xl lg:text-4xl font-bold text-gray-800">Dashboard</h1>
          <Link to="/hosting/post-job">
            <button 
              className="hidden lg:w-[178px] sm:w-auto text-white font-semibold px-2 sm:px-6 py-2 rounded-lg shadow-md transition duration-300 lg:flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: 'var(--color-accent)', 
                borderColor: 'var(--color-accent)',
                border: '1px solid'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-accent)';
              }}
            >
              <CirclePlus className="w-auto h-5" />
              <span>Post New Job</span>
            </button>
          </Link>
        </div>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Total Jobs */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                <Building2 className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                <h3 className="text-xl font-bold text-gray-900">{jobs.length}</h3>
              </div>
            </div>
          </div>
  
          {/* Total Applicants */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applicants</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.totalApplicants || 0}</h3>
              </div>
            </div>
          </div>
  
          {/* Pending Applications */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.pending || 0}</h3>
              </div>
            </div>
          </div>
          
          {/* Reviewed Applications */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-amber-50 rounded-lg">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Reviewed</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.reviewed || 0}</h3>
              </div>
            </div>
          </div>
          
          {/* Interview Applications */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                <CalendarCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Interview</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.interview || 0}</h3>
              </div>
            </div>
          </div>
          
          {/* Accepted Applications */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-emerald-50 rounded-lg">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Accepted</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.accepted || 0}</h3>
              </div>
            </div>
          </div>
          
          {/* Rejected Applications */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-red-50 rounded-lg">
                <CircleX className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.rejected || 0}</h3>
              </div>
            </div>
          </div>
        </div>
  
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
  {/* Line Chart */}
  <div className="lg:col-span-8">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-auto lg:h-[550px] flex flex-col">
      <div className="p-3 md:p-4 border-b border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Applications Trend</h2>
      </div>
      <div className="p-3 md:p-4 flex-grow">
        <LineChart jobs={jobStats} />
      </div>
    </div>
  </div>

  {/* Pie Chart */}
  <div className="lg:col-span-4">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-auto lg:h-[550px] flex flex-col">
      <div className="p-3 md:p-4 border-b border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Applications by Job</h2>
      </div>
      <div className="p-3 md:p-4 flex-grow">
        <PieChart jobs={jobStats} />
      </div>
    </div>
  </div>
</div>
  
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
            <div className="w-full sm:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent)';
                  e.target.style.boxShadow = `0 0 0 2px rgba(220, 38, 38, 0.2)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              />
            </div>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div 
                  className="animate-spin rounded-full h-8 w-8 border-b-2" 
                  style={{ borderBottomColor: 'var(--color-accent)' }}
                />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No jobs found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleJobClick(job._id)}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold"
                      style={{ 
                        backgroundColor: 'rgba(220, 38, 38, 0.1)', 
                        color: 'var(--color-primary)' 
                      }}
                    >
                      {job.title.charAt(0)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{job.title}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {job.jobType} • {job.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Job Applications */}
        <JobApplications />
      </div>
    </main>
  </div>
  );
};

export default JobHostingDashboard;