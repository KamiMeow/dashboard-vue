<template>
  <v-card class="text-center elevation-5 white--text no-select" color="accent">
    {{ data }}
  </v-card>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    data: {
      type: Object,
    },
  },
};
</script>
