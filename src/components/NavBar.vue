<template>
  <div>
    <b-navbar
      class="fixed-top border-bottom shadow bg-white"
      @click="like(index)"
      toggleable="md"
      v-shortkey="['alt', 'n']"
      @shortkey="addFundrais"
    >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/" class="pt-0">
        <img src="@/assets/Logo.jpg" width="50">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Strona główna</b-nav-item>
          <b-nav-item @click="addFundrais">Nowa zbiórka</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav is-nav id="nav-collapse" right>
            <b-navbar-brand>{{returnLogin}}</b-navbar-brand>
            <b-nav-item @click="changeLogin">
              Wyloguj
              <i class="fas fa-sign-out-alt fa-fw"></i>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: firebase.firestore().collection("Zrzuty-develop"),
      isClicked: false,
      newFundrais: {
        guid: "",
        accountNumber: "",
        creator: "",
        title: "Nowa Zbiórka",
        description: "",
        creationDate: new Date(Date.now()).toJSON(),
        endDate: new Date(Date.now() + 86400000).toJSON(),
        ended: false
      }
    };
  },
  methods: {
    async addFundrais() {
      if ((this.newFundrais.creator = localStorage.getItem("login")) && !this.isClicked) {
        this.isClicked = true;
        this.newFundrais.guid = localStorage.getItem("guid");
        let newFundrais = await this.db.add({
          fundraisInfo: { ...this.newFundrais },
          listOfParticipants: [],
          listOfProducts: [],
          listOfPropositions: []
        });
        await this.$router.push({
          name: "Fundrais",
          params: { id: newFundrais.id }
        });
        if (await newFundrais.id) {
          this.isClicked = false;
          location.reload();
        }
      }
    },
    changeLogin() {
      localStorage.removeItem("login");
      this.$router.push({ path: "/login" });
    }
  },
  computed: {
    returnLogin() {
      return localStorage.getItem("login");
    }
  }
};
</script>
<style scoped>
a:hover,
a.router-link-active,
a.router-link-exact-active {
  color: #990000 !important;
}
</style>
