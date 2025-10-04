import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const coerceNumberArray = (arr) =>
  (arr ?? []).map((v) => (typeof v === "string" ? Number(v) : (v ?? 0)));

const BarChart = ({
  labels = [],
  values = [],
  title,
  chartColor,
  datasets,
}) => {
  const ds = datasets || [
    {
      label: title ?? "Valores",
      data: coerceNumberArray(values),
      backgroundColor: chartColor ?? "rgba(59, 130, 246, 0.7)",
      borderColor: "rgb(216,216,227)",
      borderWidth: 1,
      yAxisID: "y",
    },
  ];

  const data = {
    labels,
    datasets: ds.map((d) => ({
      ...d,
      data: coerceNumberArray(d.data),
      categoryPercentage: 1.95,
      barPercentage: 0.5,
      barThickness: 45,
      maxBarThickness: 78,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: !!title, text: title || "" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
        grid: { drawBorder: false },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false, drawBorder: false },
        ticks: { precision: 0 },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 relative z-0">
      <div
        className="min-w-full h-full"
        style={{
          minWidth: labels.length > 5 ? `${labels.length * 80}px` : "100%",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
