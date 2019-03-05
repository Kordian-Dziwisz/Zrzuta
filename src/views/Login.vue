<template>
  <div>
    <login @login="changeLogin"/>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
export default {
  methods: {
    changeLogin(login) {
      if (login.length != 0) {
        localStorage.setItem("login", login);
      }
    }
  },
  components: {
    Login
  }
};
</script>
