<template>
  <v-card class="text-center elevation-5 white--text no-select">
    <div :id="`${type}-${data._id}`"></div>
  </v-card>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ColumnChart',
  props: {
    data: {
      type: Object,
    },
    isToolBar: Boolean,
    type: String,
  },
  mounted() {
    const { title, value } = this.data;
    const data = value.values
      .sort((p, n) => p.value < n.value ? 1 : -1)
      .map(i => ({
        name: this.formatName(i.name),
        y: i.value,
      }));

    if (this.isToolBar) {
      data.length = 5;
    }

    const {
      primary,
      accent,
      info,
    } = this.$vuetify.theme.themes.light;

    Highcharts.chart([this.type, this.data._id].join('-'), {
      chart: {
        height: this.isToolBar ? '125%' : '75%',
        backgroundColor: primary,
        borderWidth: 0,
        type: 'column',
      },
      title: {
        text: title,
        style: {
          color: '#fff'
        }
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      colors: [
        accent,
        info,
      ],
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            style: {
              textOutline: 'none',
              color: '#fff'
            },
            enabled: true,
            format: '{point.y}'
          }
        },
        column: {
          borderRadius: 5
        }
      },
      yAxis: {
        title: '',
        labels: {
          style: {
            color: '#fff'
          }
        },
        lineGridColor: info,
        lineColor: info,
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            color: '#fff'
          }
        }
      },

      tooltip: {
        headerFormat: '',
        pointFormat: `
          <span style="font-size:11px">{point.name}:</span><br>
          <span style="color:{point.color}"><b>{point.y}</b><br/>
        `
      },

      series: [{
        name: "Репозитории",
        colorByPoint: true,
        data,
      }],
    });
  },
  methods: {
    formatName(fullName) {
      const name = fullName.split('/')[1];
      if (!this.isToolBar) return name;

      if (name.length > 5) return name.slice(0, 5) + '...';
      return name;
    },
  },
};
</script>
