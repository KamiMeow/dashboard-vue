<template>
  <v-layout fill-height>
    <v-flex xs8>
      <v-layout column fill-height>
        <v-flex shrink>
          <link-input :loading="loading" />
        </v-flex>

        <v-flex grow>
          <dashboard-panel ref="dashboard-panel" :delete-mode="deleteMode" />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs4>
      <tool-panel
        :delete-mode="deleteMode"
        :loading="loading"
        @set-loading="loading = $event"
        @change-mode="changeMode"
        @start-drag="startDrag"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardPanel from './DashboardPanel';
import LinkInput from './LinkInput';
import ToolPanel from './ToolPanel';

export default {
  name: 'DashboardPage',

  components: {
    DashboardPanel,
    LinkInput,
    ToolPanel,
  },

  created() {
    this.loadStatistic();
  },

  data: () => ({
    deleteMode: false,
    loading: true,
  }),

  methods: {
    async loadStatistic() {
      this.loading = true;
      await this.$store.dispatch('statistic/loadStatistic');
      this.loading = false;
    },
    startDrag(data) {
      this.$refs['dashboard-panel'].addNewElement(data);
      this.$store.dispatch('statistic/saveUserStatistic', data);
    },
    changeMode() {
      this.deleteMode = !this.deleteMode;
    }
  },
};
</script>
