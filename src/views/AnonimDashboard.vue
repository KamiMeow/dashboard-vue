<template>
  <v-container class="my-2">
    <v-layout fill-height justify-center align-center wrap>
      <v-flex class="headline ma-4" xs12>
        Статистика пользователя: <span class="font-weight-medium">{{ nickname }}</span>
      </v-flex>

      <v-layout wrap class="pa-5 grey lighten-3 dashboard-field">
        <v-flex
          v-for="(item, index) in elements"
          :key="index"
          class="pa-3"
          shrink
        >
          <component
            :type="item.type"
            :data="item.item"
            :is="item.type"
            :index="index"
          />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import ColumnChart from '@/components/DashboardTools/ColumnChart';
import PieChart from '@/components/DashboardTools/PieChart';
import Counter from '@/components/DashboardTools/Counter';
import TooltipButton from '@/components/TooltipButton';

export default {
  name: 'DashboardPanel',

  components: {
    TooltipButton,
    ColumnChart,
    PieChart,
    Counter,
  },

  created() {
    this.loadDashboard();
  },

  data: () => ({
    elements: [],
  }),

  computed: {
    nickname() {
      return this.$route.params.nickname;
    },
    token() {
      return this.$route.params.token;
    },
  },

  methods: {
    async loadDashboard() {
      const elements = await this.$store.dispatch('statistic/loadUserDashboard', this.token);
      this.elements = elements.map(el => {
        const type = el.name;
        return el.data.map(d => ({
          item: d,
          type,
        }));
      })
        .flat();
    }
  },
};
</script>

<style scoped>
  .dashboard-field {
    border-radius: 20px;
  }
</style>
