<template>
  <div id="vue">
    <nav-bar/>
    <br>
    <router-view/>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>
