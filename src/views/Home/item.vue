<template>
  <b-container class="w-100 m-0 text-dark bg-light" fluid>
    <b-row class="mx-auto border-bottom-1 mt-3">
      <b-col md="0">{{item.index}}</b-col>

      <b-col sm="5">
        <p class="h4 mr-1">{{item.title}}</p>twórca:
        <p class="h6 d-inline">{{item.creator}}</p>
      </b-col>

      <b-col sm="4" class="pt-4 px-0">status:
        <p class="h6 d-inline" v-if="item.endDate < new Date(Date.now())">zbiórka już się zakończyła</p>
        <p class="h6 d-inline" v-else-if="item.ended">Dokonaj zapłaty</p>
        <p class="h6 d-inline" v-else>Zbiórka jest w trakcie realizacji</p>
      </b-col>

      <b-col sm="2" class="p-0">
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" v-if="isYour">
          <b-button class="btn-secondary px-1 mr-1">Edytuj</b-button>
        </router-link>
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" v-else>
          <b-button class="btn-secondary px-0 mr-1">Otwórz</b-button>
        </router-link>
        <b-button class="btn-danger" @click="removeItem" v-if="isYour">Usuń</b-button>
      </b-col>
      <hr>
    </b-row>
    <b-row class="pl-5 mx-auto">
      <b-col md="5" class="overflow-auto">{{item.description}}</b-col>

      <b-col
        v-if="!item.endDate < new Date(Date.now())"
        md="5"
      >Zbiórka kończy się: {{ item.endDate | moment("dddd, d MMMM YYYY")}} o godzinie: {{ item.endDate | moment("h:mm")}}</b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {
    item: Object
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
