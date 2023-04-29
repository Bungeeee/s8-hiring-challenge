import { Bar } from "react-chartjs-2";
import ChartJSDataLabel from 'chartjs-plugin-datalabels'
import { Chart as ChartJS } from "chart.js/auto";
import { Chart as CJS } from "chart.js";
import "chartjs-adapter-date-fns";

const CandleStick = {
  id: "candlestick",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, width, height, left, right },
      scales: { x, y }
    } = chart;
    ctx.save();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "black";
    data.datasets[0].data.forEach((d, idx) => {
      ctx.beginPath();
      ctx.moveTo(
        chart.getDatasetMeta(0).data[idx].x,
        y.getPixelForValue(data.datasets[0].data[idx].l)
      );
      ctx.lineTo(
        chart.getDatasetMeta(0).data[idx].x,
        y.getPixelForValue(data.datasets[0].data[idx].h)
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(
        chart.getDatasetMeta(0).data[idx].x - 2.5,
        y.getPixelForValue(data.datasets[0].data[idx].l)
      );
      ctx.lineTo(
        chart.getDatasetMeta(0).data[idx].x + 2.5,
        y.getPixelForValue(data.datasets[0].data[idx].l)
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(
        chart.getDatasetMeta(0).data[idx].x - 2.5,
        y.getPixelForValue(data.datasets[0].data[idx].h)
      );
      ctx.lineTo(
        chart.getDatasetMeta(0).data[idx].x + 2.5,
        y.getPixelForValue(data.datasets[0].data[idx].h)
      );
      ctx.stroke();
    });
  }
}

const config = {
  options: {
    maintainAspectRatio: true,
    responsive: true,
    parsing: {
      yAxisKey: "s",
      xAxisKey: "x"
    },
    scales: {
      x: { display: false, type: "timeseries", time: { unit: "day" } },
      y: {
        beginAtZero: false,
        title: { text: 'USD'},
        ticks: {
          display: true,
          font: {
            size: 8, 
          },
        }
      },
    },
    plugins: {
      datalabels: false,
      legend: false,
      tooltip: {
        display: true,
        padding: 12,
        callbacks: {
          beforeBody: (context) => {
            let infos = []
            infos.push(`Open: ${context[0].raw.o}`)
            infos.push(`Close: ${context[0].raw.c}`)
            infos.push(`High: ${context[0].raw.h}`)
            infos.push(`Low: ${context[0].raw.l}`)
            if (context[0].raw.v) infos.push(`Volume: ${context[0].raw.v}`)
            return infos
          },
          label: (ctx) => ('')
        },
      }
    },
  },
  plugins: [CandleStick]
};

const CandleStickChart = ({data}) => {
  CJS.register([ChartJSDataLabel])
  return <Bar data={data} {...config} />
}

export default CandleStickChart