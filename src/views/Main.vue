<template>
  <div class="main">
    <login @login="changeLogin" v-if="!logged"/>
    <p>{{login}}</p>
    <fundraising-list v-if="logged"></fundraising-list>
  </div>
</template>

<script>
import Vue from "vue";
import Login from "@/components/mainpage/Login.vue";
import FundraisingList from "@/components/mainpage/Fundraising.list.vue";
export default {
  data() {
    return {
      logged: false,
      login: "",
      placeholder: 12
    };
  },
  methods: {
    changeLogin(login) {
      if (login != "") {
        this.logged = true;
      }

      localStorage.setItem("login", login);
      this.login = login;
    }
  },
  components: {
    Login,
    FundraisingList
  }
};
</script>
<style scoped>
.main {
  padding-top: 80px;
}
</style>


