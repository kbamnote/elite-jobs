import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState("");
  const [graphData, setGraphData] = useState({
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    dataPoints: [0, 0, 0, 0, 0, 0, 0]
  });
  const [isLoading] = useState(false);

  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0].jobId || jobs[0]._id);
    }
  }, [jobs]);
  
  useEffect(() => {
    if (selectedJob && jobs.length > 0) {
      // Find the selected job in the jobStats array
      const selectedJobData = jobs.find(job => job.jobId === selectedJob || job._id === selectedJob);
      
      if (selectedJobData) {
        // Use weeklyStats data from the API
        const weeklyStats = selectedJobData.weeklyStats || [];
        const labels = weeklyStats.map(stat => stat.day);
        const dataPoints = weeklyStats.map(stat => stat.count);
        
        setGraphData({
          labels,
          dataPoints
        });
      } else {
        // Fallback to default data
        setGraphData({
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          dataPoints: [0, 0, 0, 0, 0, 0, 0]
        });
      }
    }
  }, [selectedJob, jobs]);

  const getYAxisMax = () => {
    if (!graphData) return 8;
    const maxApplicants = Math.max(...graphData.dataPoints);
    return maxApplicants <= 8 ? 8 : Math.ceil(maxApplicants / 4) * 4;
  };

  const getStepSize = () => {
    const max = getYAxisMax();
    return max <= 8 ? 1 : Math.ceil(max / 8);
  };

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: selectedJob ? "Applicants" : "Select a job to view applications",
        data: graphData.dataPoints,
        borderColor: "var(--color-accent)", // Red theme
        backgroundColor: "rgba(220, 38, 38, 0.1)", // Red with opacity
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "var(--color-accent)", // Red
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 10,
          font: {
            size: 11,
            weight: "500",
          },
          color: "var(--color-primary)", // Red theme for legend
        },
      },
      tooltip: {
        backgroundColor: "rgba(220, 38, 38, 0.9)", // Red tooltip
        padding: 8,
        titleFont: {
          size: 12,
          weight: "600",
        },
        bodyFont: {
          size: 11,
        },
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} Applicants`;
          }
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: getYAxisMax(),
        ticks: {
          stepSize: getStepSize(),
          precision: 0,
          font: {
            size: 10,
          },
          color: "var(--color-primary)", // Red theme for ticks
        },
        grid: {
          color: "rgba(220, 38, 38, 0.06)", // Very light red for grid
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
          color: "var(--color-primary)", // Red theme for ticks
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // Find the selected job title for display
  const getSelectedJobTitle = () => {
    if (!selectedJob) return "";
    const job = jobs.find(job => job.jobId === selectedJob || job._id === selectedJob);
    return job ? job.jobTitle || job.title : "";
  };

  // Calculate total applicants for the selected job
  const getTotalApplicants = () => {
    return graphData.dataPoints.reduce((a, b) => a + b, 0);
  };

  // Find peak day
  const getPeakDay = () => {
    if (graphData.dataPoints.length === 0) return "";
    const maxIndex = graphData.dataPoints.indexOf(Math.max(...graphData.dataPoints));
    return graphData.labels[maxIndex] || "";
  };

  // Calculate average per day
  const getAveragePerDay = () => {
    if (graphData.dataPoints.length === 0) return 0;
    const total = graphData.dataPoints.reduce((a, b) => a + b, 0);
    return (total / graphData.dataPoints.length).toFixed(1);
  };

  // Count active days
  const getActiveDays = () => {
    return graphData.dataPoints.filter(x => x > 0).length;
  };

  return (
    <div className="lg:h-[450px] w-full rounded-xl p-2">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
            Applicants Per Day
          </h2>
          
          <div className="w-full sm:w-56">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg 
                         text-sm text-gray-700 outline-none transition-colors duration-200"
              style={{
                '&:focus': {
                  borderColor: 'var(--color-accent)',
                  boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.2)'
                }
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
                e.target.style.boxShadow = '0 0 0 2px rgba(220, 38, 38, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select a job</option>
              {jobs.map((job) => (
                <option key={job.jobId || job._id} value={job.jobId || job._id}>
                  {job.jobTitle || job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className=" w-full h-[250px] rounded-lg">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}></div>
                <p className="text-xs" style={{ color: 'var(--color-primary)' }}>Loading chart data...</p>
              </div>
            </div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>

        {selectedJob && graphData && (
          <div className="lg:mt-[45px] grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>Total Applicants</p>
              <p className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
                {getTotalApplicants()}
              </p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>Peak Day</p>
              <p className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
                {getPeakDay()}
              </p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>Average/Day</p>
              <p className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
                {getAveragePerDay()}
              </p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>Active Days</p>
              <p className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
                {getActiveDays()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;