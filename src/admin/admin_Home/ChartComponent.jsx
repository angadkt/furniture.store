import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip , Legend } from 'chart.js'


ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({users}) => {
    const data = {
        labels: ['New', 'Returning', 'Inactive'],
        datasets: [
          {
            data: [60, 30, 10], // percentages for the chart
            backgroundColor: ['#fbbf24', '#fcd34d', '#fde68a'], // yellow shades
            hoverBackgroundColor: ['#f59e0b', '#fbbf24', '#facc15'],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%', // Makes it a donut
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      };
  return (
    <div className="bg-white  rounded-lg p-6 max-w-sm w-full">
      {/* Card Header */}
      <h2 className="text-gray-700 text-xl font-semibold">Total Users</h2>
      <p className="text-gray-400 text-sm mb-4">Total user source</p>

      {/* Main Stats Section */}
      <div className="flex justify-between items-center">
        {/* Main Number */}
        <div>
          <h3 className="text-4xl font-bold text-gray-800">Users : {users.length}</h3>
          {/* <p className="text-gray-400 text-sm mt-1">New vs Returning</p> */}
        </div>

        {/* Donut Chart */}
        <div className="relative w-24 h-24">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-4">
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
            <span className="text-sm text-gray-500">60% New</span>
          </li>
          <li className="flex items-center">
            <span className="block w-3 h-3 rounded-full bg-yellow-300 mr-2"></span>
            <span className="text-sm text-gray-500">30% Returning</span>
          </li>
          <li className="flex items-center">
            <span className="block w-3 h-3 rounded-full bg-yellow-100 mr-2"></span>
            <span className="text-sm text-gray-500">10% Inactive</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ChartComponent
