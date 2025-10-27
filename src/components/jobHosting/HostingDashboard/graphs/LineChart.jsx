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
    dataPoints: [5, 8, 12, 6, 15, 9, 11]
  });
  const [isLoading] = useState(false);

  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]._id);
    }
  }, [jobs]);
  
  useEffect(() => {
    if (selectedJob) {
      // Static data for design-only mode
      const staticData = {
        "1": { labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], dataPoints: [5, 8, 12, 6, 15, 9, 11] },
        "2": { labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], dataPoints: [3, 6, 9, 4, 12, 7, 8] },
        "3": { labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], dataPoints: [2, 4, 6, 3, 8, 5, 6] },
        "4": { labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], dataPoints: [7, 10, 15, 8, 18, 12, 14] }
      };
      
      setGraphData(staticData[selectedJob] || staticData["1"]);
    }
  }, [selectedJob]);

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
        borderColor: "#0d9488", // Changed to teal
        backgroundColor: "rgba(13, 148, 136, 0.1)", // Teal with opacity
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "#0d9488", // Teal
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
          color: "#0f766e", // Darker teal for legend
        },
      },
      tooltip: {
        backgroundColor: "rgba(13, 148, 136, 0.9)", // Teal tooltip
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
          color: "#0f766e", // Darker teal for ticks
        },
        grid: {
          color: "rgba(13, 148, 136, 0.06)", // Very light teal for grid
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
          color: "#0f766e", // Darker teal for ticks
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="lg:h-[450px] w-full rounded-xl p-2">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-teal-800">
            Applicants Per Day
          </h2>
          
          <div className="w-full sm:w-56">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg 
                         text-sm text-gray-700 focus:border-teal-500 focus:ring-2 
                         focus:ring-teal-200 outline-none transition-colors duration-200"
            >
              <option value="">Select a job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className=" w-full h-[250px] rounded-lg">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-6 border-3 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-teal-600">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>

        {selectedJob && graphData && (
          <div className="lg:mt-[45px] grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <p className="text-xs text-teal-600">Total Applicants</p>
              <p className="text-lg font-semibold text-teal-700">
                {graphData.dataPoints.reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="p-2 bg-teal-50 rounded-lg">
              <p className="text-xs text-teal-600">Peak Day</p>
              <p className="text-lg font-semibold text-teal-700">
                {graphData.labels[graphData.dataPoints.indexOf(Math.max(...graphData.dataPoints))]}
              </p>
            </div>
            <div className="p-2 bg-teal-50 rounded-lg">
              <p className="text-xs text-teal-600">Average/Day</p>
              <p className="text-lg font-semibold text-teal-700">
                {(graphData.dataPoints.reduce((a, b) => a + b, 0) / 7).toFixed(1)}
              </p>
            </div>
            <div className="p-2 bg-teal-50 rounded-lg">
              <p className="text-xs text-teal-600">Active Days</p>
              <p className="text-lg font-semibold text-teal-700">
                {graphData.dataPoints.filter(x => x > 0).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;