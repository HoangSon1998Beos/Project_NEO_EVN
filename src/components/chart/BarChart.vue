<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
import Api from "../../api/api.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      ChartOnMonth: [],
      token: localStorage.getItem("token"),
      chartData: {
        labels: [],
        datasets: [{ data: [] }],
      },
      // chartData: [],
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              beginAtZero: true,
            },
          },
          y: {
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    };
  },
  methods: {
    GetBarChart() {
      Api.dashbroard
        .indexWidthPath("getChannelChartOnMonth")
        .then((response) => {
          this.ChartOnMonth = response.data.content;
          console.log(this.ChartOnMonth);
          this.chartData = {
            labels: this.ChartOnMonth.map((item) => item.chanelCode),
            datasets: [
              {
                label: "",
                data: this.ChartOnMonth.map((item) => item.amount),
                backgroundColor: ["#00cfe6"],
              },
            ],
          };
          console.log(this.chartData);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
  created() {
    this.GetBarChart();
  },
};
</script>
