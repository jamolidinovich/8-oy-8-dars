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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import dataJson from "../assets/data.json";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export function Chart() {
  const [dataChart, setDataChart] = useState({});
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
    const labels = [];
    const values = [];
    const selectedBatch = dataJson.batchList[chartIndex];
    selectedBatch.rates.forEach((el, index) => {
      labels.push(
        timeConverter(selectedBatch.startTime + index * selectedBatch.interval)
      );
      values.push(el);
    });
    setDataChart({
      labels,
      datasets: [
        {
          label: `Dataset ${chartIndex + 1}`,
          data: values,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  }, [chartIndex]);

  const handleButtonClick = (index) => {
    setChartIndex(index);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              backgroundColor: chartIndex === index ? "blue" : "transparent",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              margin: "0 5px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {dataChart?.labels?.length ? (
        <Line options={options} data={dataChart} />
      ) : (
        <p>Loading chart...</p>
      )}
      <div>
        <ul>
          {dataChart &&
            dataChart.length > 0 &&
            dataChart.labels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
        </ul>
      </div>
    </>
  );
}
