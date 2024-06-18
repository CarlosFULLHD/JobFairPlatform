<template>
  <v-app id="inspire">
    <div class="app">
      <Navigation ref="navigationComponent"/>
      <div class="Contenido">
      <AlertsPopup />
      <router-view />
      <PageFooter />
      <v-btn
        fixed
        fab
        bottom
        right
        class="ma-5"
        large
        color="primary"
        @click="goToTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import PageFooter from "@/components/PageFooter.vue";
import AlertsPopup from "@/components/AlertsPopups.vue"

export default {
  name: "App",
  components:{
    Navigation,
    PageFooter,
    AlertsPopup,
  },
  created() {
    this.initialize()
    this.$router.afterEach((to) => {
    document.title = to.meta.title || 'webMi sitio ';
  });
  },
  methods: {
    initialize(){
      this.$store.dispatch('initialize')
    
    },
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}
.Contenido{
  display: fixed;
  margin-top: 6.9%;
}
.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}

.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>