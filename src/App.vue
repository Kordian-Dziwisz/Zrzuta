<template>
  <div id="vue">
    <nav-bar/>
    <router-view/>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  updated() {
    localStorage.setItem("guid", this.generateGuid());
  },
  methods: {
    generateGuid() {
      var nav = window.navigator;
      var guid = nav.mimeTypes.length;
      guid += nav.userAgent.replace(/\D+/g, "");
      guid += nav.plugins.length;

      return guid;
    }
  },
  components: {
    NavBar
  }
};
</script>
<style>
#vue {
  padding-top: 5.5rem;
}
</style>

