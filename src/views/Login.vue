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
      if (login) {
        localStorage.setItem("login", login);
        if (this.$route.query.nextURL != null) {
          this.$router.push({ path: this.$route.query.nextURL });
        } else this.$router.push({ path: "/" });
      }
    }
  },
  components: {
    Login
  }
};
</script>