<template>
  <Bar id="my-chart" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
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
      StoryMaxMonth: [],
      token: localStorage.getItem("token"),
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
      // chartData: [],
      chartOptions: {
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    GetBarChart() {
      axios
        .get(
          "http://10.252.10.112:3232/chatbot/dashboard/getListStoryMaxMonth",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.StoryMaxMonth = response.data.content;
          console.log(this.StoryMaxMonth);
          this.chartData = {
            labels: this.StoryMaxMonth.map((item) => item.storyName),
            datasets: [
              {
                label: "",
                data: this.StoryMaxMonth.map((item) => item.amount),
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
<style>
#my-chart {
  height: 340px;
}
</style>
