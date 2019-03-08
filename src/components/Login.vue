<template>
  <div class="Login">
    <br>
    <b-alert
      class="mt-1 pl-3"
      id="alertMargin"
      variant="danger"
      dismissible
      :show="alert"
    >Zaloguj się, aby przejść dalej!</b-alert>
    <form class="w-50 mx-auto mt-3" @submit.prevent="returnLogin">
      <b-form-input v-model="login" placeholder="Wpisz login" type="text"/>
      <b-button type="submit" class="mt-1">Zaloguj się</b-button>
      <br>
    </form>
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
    if ((this.login = localStorage.getItem("login"))) {
    } else {
      localStorage.setItem("login", "");
      this.login = "";
    }
  },
  methods: {
    returnLogin() {
      this.$emit("login", this.login);
    }
  },
  computed: {
    alert() {
      return this.login.length == 0;
    }
  }
};
</script>
<style scoped>
.Login {
  width: 100%;
  height: 18rem;
  text-align: center;
  padding: 6vh;
  background-color: rgb(219, 219, 219);
  box-shadow: 0.5vw 0.5vw 1vh rgba(00, 00, 00, 50%);
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>

