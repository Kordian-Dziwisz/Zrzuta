<template>
  <div class="Login">
    <br>
    <div class="w-50 mx-auto">
      <b-form-input
        @keydown.enter="returnLogin"
        v-model="login"
        placeholder="Tutaj wpisz login"
        type="text"
      />
      <b-button @click="returnLogin" class="mt-1">Zaloguj się</b-button>
      <br>
      <b-alert
        class="mt-1 pl-3"
        id="alertMargin"
        variant="danger"
        dismissible
        :show="showAlert"
      >Zaloguj się, aby przejść dalej!</b-alert>
    </div>
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
  height: 18rem;
  text-align: center;
  padding: 15vh;
  background-color: rgb(219, 219, 219);
  box-shadow: 0.5vw 0.5vw 1vh rgba(00, 00, 00, 50%);
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>

