<template>
  <div class="Login">
    <label>Login Panel</label>
    <br>
    <input @keydown.enter="returnLogin" v-model="login" placeholder="your login">
    <b-alert variant="danger" dismissible :show="showAlert">Zaloguj się, aby przejść dalej!</b-alert>
    <font-awesome-icon icon="coffee"/>
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

