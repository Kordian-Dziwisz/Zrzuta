<template>
  <div>
    <b-card class="d-none d-lg-block w-50 mx-auto">
      <b-card-title>Zaloguj się</b-card-title>
      <b-card-text>
        <form class="w-75 mx-auto mb-3" @submit.prevent="returnLogin">
          <b-input
            v-model.lazy.trim="login"
            placeholder="Wpisz login"
            type="text"
            maxlength="30"
            :state="validation"
            autocomplete="off"
          />

          <b-button type="submit" size="sm" class="d-block float-right mb-3">Zaloguj się</b-button>
          <b-form-invalid-feedback>Login musi mieć od 3 do 30 znaków!</b-form-invalid-feedback>
        </form>
      </b-card-text>
    </b-card>
    <b-card class="d-block d-lg-none w-100 mx-auto">
      <b-card-title>Zaloguj się</b-card-title>
      <form class="w-75 mx-auto mt-3" @submit.prevent="returnLogin">
        <b-input
          v-model.lazy.trim="login"
          placeholder="Wpisz login"
          type="text"
          maxlength="30"
          :state="validation"
          autocomplete="off"
        />
        <b-form-invalid-feedback :state="validation">Login musi mieć od 3 do 30 znaków!</b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation"></b-form-valid-feedback>
        <b-button type="submit" size="sm" class="my-1 float-right">Zaloguj się</b-button>
      </form>
    </b-card>
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
      if (this.validation) {
        this.$emit("login", this.login);
      }
      location.reload();
    }
  },
  computed: {
    alert() {
      return this.login.length == 0;
    },
    validation() {
      return this.login.length >= 3 && this.login.length <= 30;
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

