<template>
  <div id="app">
    <b-navbar toggleable="md" :sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#" id="paddingCenter">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfuNsZHffYNmIn1UcFABUb6-GnknWFFrXIniz1R-Ocer4BMCMug"
          width="50"
        >
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home'}">Home</b-nav-item>
          <b-nav-item :to="{ name: 'about'}">Nowa zbiórka</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand id="marginCenter" right>
            <p>Oddajcie mi hajs</p>
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br>
    <router-view/>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0.5vw 0.5vw 1vh rgba(00, 00, 00, 50%);
  border: 2px solid #ccc;
}

#paddingCenter {
  padding-top: 0;
}

#marginCenter {
  margin: 0;
}
</style>
