<template>
  <div class="Login">
    <label>Login Panel</label>
    <br>
    <input id="inputLogin" @keydown.enter="returnLogin" v-model="login" placeholder="your login">
    <br>
    <b-alert
      id="alertMargin"
      variant="danger"
      dismissible
      :show="showAlert"
    >Zaloguj się, aby przejść dalej!</b-alert>
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
.Login {
  width: 100%;
  height: 50vh;
  text-align: center;
  padding: 15vh;
  background-color: rgb(219, 219, 219);
  box-shadow: 0.5vw 0.5vw 1vh rgba(00, 00, 00, 50%);
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

#alertMargin {
  margin-top: 1vh;
}
</style>

