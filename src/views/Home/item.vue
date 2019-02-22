<template>
  <b-container class="w-100 m-0 text-dark bg-light" fluid>
    <b-row class="mx-auto border-bottom mt-3">
      <b-col sm="5">
        <b-row>
          <p class="h4 mr-1">{{item.title}}</p>
        </b-row>
        <b-row>
          <p class="h6 d-inline">twórca: {{item.creator}}</p>
        </b-row>
      </b-col>

      <b-col sm="4" class="pt-4 px-0">
        <b-row>
          <p
            class="h6 d-inline text-danger"
            v-if="item.endDate < new Date(Date.now())"
          >Zbiórka zakończona</p>
          <p class="h6 d-inline text-warning" v-else-if="item.ended">Dokonaj zapłaty</p>
          <p class="h6 d-inline text-success" v-else>Zbiórka w trakcie</p>
        </b-row>
      </b-col>

      <b-col sm="2" class="px-0">
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" v-if="isYour">
          <b-button class="btn-info">Edytuj</b-button>
        </router-link>
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" v-else>
          <b-button class="btn-info">Otwórz</b-button>
        </router-link>&nbsp;
        <b-button class="btn-outline-danger btn-light" @click="removeItem" v-if="isYour">Usuń</b-button>
      </b-col>
      <hr>
    </b-row>

    <b-row>
      <b-col md="5">
        <b-collapse v-model="click" id>{{item.description}}</b-collapse>
        <b-button class="btn-secondary text-center" @click="click = !click" size="sm">
          <span v-if="!click">Pokaż opis</span>
          <span v-else>Ukryj opis</span>
        </b-button>
      </b-col>
      <b-col
        v-if="!item.endDate < new Date(Date.now())"
      >Zbiórka kończy się: {{ item.endDate | moment("dddd, d MMMM YYYY")}} - {{ item.endDate | moment("H:mm")}}</b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      click: false
    };
  },
  methods: {
    editItem() {
      this.$emit("edit", this.item.index);
    },
    removeItem() {
      this.$emit("remove", {
        index: this.item.index,
        id: this.item.id
      });
    }
  },
  created() {
    this.item.creationDate = new Date(this.item.creationDate.seconds * 1000);
    this.item.endDate = new Date(this.item.endDate.seconds * 1000);
  },
  computed: {
    isYour() {
      return this.item.creator == localStorage.getItem("login");
    }
  }
};
</script>
<style scoped>
.red {
  background-color: red;
}
</style>

