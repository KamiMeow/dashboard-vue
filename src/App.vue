<template>
  <v-app>
    <template v-if="isEmpty">
      <router-view />
    </template>

    <v-content v-else fluid>
      <the-menu />
      <notification />

      
      <v-container fluid class="pa-0" fill-height>
        <v-layout fill-height justify-center>
          <v-slide-y-transition mode="out-in">
            <router-view />
          </v-slide-y-transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Notification from '@/components/Notification';
import TheMenu from '@/components/TheMenu';

export default {
  name: 'App',

  components: {
    Notification,
    TheMenu,
  },

  computed: {
    isEmpty() {
      return this.$route.meta.access;
    },
  },
};
</script>

<style lang="stylus">
html {
  overflow-y: hidden !important;
}

.cursor--pointer {
  cursor: pointer;
}
.cursor--grab {
  cursor: grab;
}
.no-select {
  user-select none
}

.custom-elevation,
.v-card,
.v-stepper,
.v-stepper__header,
.v-expansion-panel,
.custom-elevation-2,
.v-btn-toggle--selected,
.v-stepper__header
.v-card.v-card--flat {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.07) !important;
}


#app.v-application .display-4,
#app.v-application .display-3,
#app.v-application .display-2,
#app.v-application .display-1,
#app.v-application .headline,
#app.v-application .title,
#app.v-application .subtitle-1,
#app.v-application .subtitle-2,
#app.v-application .body-1,
#app.v-application .body-2,
#app.v-application .caption,
#app.v-application .overline {
  font-family: "Ubuntu", sans-serif !important;
}

.v-application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
