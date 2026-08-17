"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ accounts = [] }: DoughnutChartProps) => {
  const hasAccounts = accounts && accounts.length > 0;
  const accountNames = hasAccounts ? accounts.map((a) => a.name) : ["No Accounts"];
  const balances = hasAccounts ? accounts.map((a) => a.currentBalance) : [1];
  const bgColors = hasAccounts
    ? ["#0747b6", "#2265d8", "#2f91fa", "#6172f3", "#9b8afb"]
    : ["#e9ecef"];

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: bgColors,
      },
    ],
    labels: accountNames,
  };

  return <Doughnut 
    data={data} 
    options={{
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />
}

export default DoughnutChart