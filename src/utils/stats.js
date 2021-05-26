import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';

const Color = {
  WHITE: '#ffffff',
  BLACK: '#000000',
};

const getTimeDiff = (time) => {
  const tripDuration = dayjs.duration(time);
  const days = tripDuration.days();
  const hours = tripDuration.hours();
  const minutes = tripDuration.minutes();

  return `${days > 0 ? days + 'D' : ''} ${hours > 0 ? hours + 'H' : ''} ${minutes > 0 ? minutes + 'M' : ''}`;
};

export const renderMoneyChart = (moneyCtx, points, labels) => {
  const costsByTypes = labels.map((label) => {
    return points.reduce((acc, point) => {
      return point.type.toUpperCase() === label ? acc + point.basePrice : acc;
    }, 0);
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data: costsByTypes,
        backgroundColor: Color.WHITE,
        hoverBackgroundColor: Color.WHITE,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: Color.BLACK,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        }
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: Color.BLACK,
        fontSize: 23,
        position: 'left'
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Color.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export const renderTypeChart = (typeCtx, points, labels) => {
  const countByTypes = labels.map((type) => {
    return points.reduce((acc, point) => {
      return point.type.toUpperCase() === type ? acc + 1 : acc;
    }, 0);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data: countByTypes,
        backgroundColor: Color.WHITE,
        hoverBackgroundColor: Color.WHITE,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: Color.BLACK,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        }
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: Color.BLACK,
        fontSize: 23,
        position: 'left'
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Color.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export const renderTimeChart = (typeCtx, points, labels) => {
  const durationByTypes = labels.map((type) => {
    return points.reduce((acc, point) => {
      return point.type.toUpperCase() === type ? acc + point.end.diff(point.start) : acc;
    }, 0);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data: durationByTypes,
        backgroundColor: Color.WHITE,
        hoverBackgroundColor: Color.WHITE,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: Color.BLACK,
          anchor: 'end',
          align: 'start',
          formatter: (val) => getTimeDiff(val),
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: Color.BLACK,
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Color.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
