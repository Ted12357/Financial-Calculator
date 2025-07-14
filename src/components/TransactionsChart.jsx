// src/components/TransactionsCharts.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function groupByDateAndSum(transactions, filterType) {
  const map = new Map();

  transactions.forEach(({ date, amount, type }) => {
    if (filterType && type !== filterType) return;
    map.set(date, (map.get(date) || 0) + amount);
  });

  // Sort dates ascending
  const sortedDates = Array.from(map.keys()).sort();

  const amounts = sortedDates.map(date => map.get(date));

  return { dates: sortedDates, amounts };
}

export default function TransactionsCharts({ data }) {
  // Income data
  const incomeData = groupByDateAndSum(data, 'income');
  // Expense data
  const expenseData = groupByDateAndSum(data, 'expense');

  // Net savings = income - expense per date
  const allDatesSet = new Set([...incomeData.dates, ...expenseData.dates]);
  const allDates = Array.from(allDatesSet).sort();

  const netSavingsAmounts = allDates.map(date => {
    const income = incomeData.dates.includes(date)
      ? incomeData.amounts[incomeData.dates.indexOf(date)]
      : 0;
    const expense = expenseData.dates.includes(date)
      ? expenseData.amounts[expenseData.dates.indexOf(date)]
      : 0;
    return income - expense;
  });

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  const incomeChartData = {
    labels: incomeData.dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData.amounts,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const expenseChartData = {
    labels: expenseData.dates,
    datasets: [
      {
        label: 'Expense',
        data: expenseData.amounts,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const netSavingsChartData = {
    labels: allDates,
    datasets: [
      {
        label: 'Net Savings',
        data: netSavingsAmounts,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <h3>Income</h3>
        <Line data={incomeChartData} options={commonOptions} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <h3>Expense</h3>
        <Line data={expenseChartData} options={commonOptions} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <h3>Net Savings</h3>
        <Line data={netSavingsChartData} options={commonOptions} />
      </div>
    </div>
  );
}