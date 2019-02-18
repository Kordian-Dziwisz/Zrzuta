<template>
  <div class="Login">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
      crossorigin="anonymous"
    >
    <label>Login Panel</label>
    <br>
    <input @keydown.enter="returnLogin" v-model="login" placeholder="your login">
    <b-alert variant="danger" dismissible :show="showAlert">
      <i class="fas fa-exclamation-triangle"></i> Zaloguj się, aby przejść dalej!
    </b-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: ""
    };
  },
  created() {
    this.login = localStorage.getItem("login");
  },
  methods: {
    returnLogin() {
      this.$emit("login", this.login);
    }
  },
  // Function for alert
  computed: {
    showAlert() {
      return this.login.length == 0;
    }
  }
};
</script>
<style scoped>
</style>

