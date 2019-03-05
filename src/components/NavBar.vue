<template>
  <div>
    <b-navbar
      class="fixed-top shadow bg-white"
      toggleable="md"
      v-shortkey="['alt', 'n']"
      @shortkey="addNewFundrais"
    >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#" id="paddingCenter">
        <img src="@/assets/Logo.jpg" width="50">
      </b-navbar-brand>
      <!--https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfuNsZHffYNmIn1UcFABUb6-GnknWFFrXIniz1R-Ocer4BMCMug -->
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home'}">Home</b-nav-item>
          <b-nav-item @click="addNewFundrais">Nowa zbiórka</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            <p id="marginCenter">Oddajcie mi pieniondze</p>
          </b-navbar-brand>
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
      db: firebase.firestore().collection("Zrzuty"),
      clicked: false,
      newFundrais: {
        guid: "",
        accountNumber: "",
        creator: "",
        title: "",
        description: "",
        creationDate: new Date(Date.now()).toJSON(),
        endDate: new Date(Date.now()).toJSON(),
        ended: false
      }
    };
  },
  methods: {
    async addNewFundrais() {
      if ((this.newFundrais.creator = localStorage.getItem("login")) && this.clicked == false) {
        this.clicked = true;
        this.newFundrais.guid = this.generateGuid();
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
      }
    },
    generateGuid() {
      var nav = window.navigator;
      var screen = window.screen;
      var guid = nav.mimeTypes.length;
      guid += nav.userAgent.replace(/\D+/g, "");
      guid += nav.plugins.length;
      guid += screen.height || "";
      guid += screen.width || "";
      guid += screen.pixelDepth || "";

      return guid;
    }
  }
};
</script>

<style scoped>
.shadow {
  box-shadow: 0.5vw 0.5vw 1vh rgba(00, 00, 00, 50%);
  border-radius: 0.25rem;
}
#paddingCenter {
  padding-top: 0;
}

#marginCenter {
  margin: 0;
}
</style>
