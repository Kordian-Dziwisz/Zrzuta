<template>
  <b-container class="w-100 mb-1 text-dark bg-white" fluid>
    <b-row class="mx-0 border-bottom mt-3">
      <b-col sm="5">
        <b-row>
          <p class="h4 mr-1">{{item.title}}</p>
        </b-row>
        <b-row>
          <p class="h6 d-inline font-weight-light">
            twórca:
            <span class="font-weight-bold">{{item.creator}}</span>
          </p>
        </b-row>
      </b-col>
      <b-col sm="4" class="pt-4 px-0">
        <b-row>
          <p
            class="h4 d-inline text-danger"
            v-if="item.endDate < new Date(Date.now())"
          >Zbiórka zakończona</p>
          <p class="h4 d-inline text-warning" v-else-if="item.ended">Dokonaj zapłaty</p>
          <p class="h4 d-inline text-success" v-else>Zbiórka w trakcie</p>
        </b-row>
      </b-col>

      <b-col lg="3" sm="3" class="pt-4 pr-0 pl-5 text-lg-right">
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" v-if="isYour">
          <b-button class="btn-outline-primary btn-light" size="sm">
            Edytuj
            <i class="fas fa-edit"></i>
          </b-button>
        </router-link>
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" v-else>
          <b-button class="btn-outline-primary btn-light" size="sm">
            <i class="fas fa-door-open"></i>&nbsp;Otwórz
          </b-button>
        </router-link>&nbsp;
        <b-button class="btn-outline-danger btn-light" size="sm" @click="remove" v-if="isYour">
          Usuń
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </b-col>
      <hr>
    </b-row>

    <b-row>
      <b-col sm="7">
        <div v-if="item.description.length != 0">
          <b-collapse v-model="click" id>{{item.description}}</b-collapse>
          <b-button
            class="btn-outline-secondary btn-light text-center"
            @click="click = !click"
            size="sm"
          >
            <span v-if="!click">Pokaż opis</span>
            <span v-else>Ukryj opis</span>
          </b-button>
        </div>
      </b-col>
      <b-col v-if="!item.endDate < new Date(Date.now())" class="font-weight-light text-lg-right">
        Zbiórka kończy się:
        <span
          class="font-weight-bold text-danger"
        >{{ item.endDate | moment("dddd, D MMMM YYYY")}} - {{ item.endDate | moment("H:mm")}}</span>
      </b-col>
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
    remove() {
      this.$emit("remove", {
        index: this.item.index,
        id: this.item.id
      });
    }
  },
  created() {
    this.item.creationDate = new Date(this.item.creationDate);
    this.item.endDate = new Date(this.item.endDate);
  },
  computed: {
    isYour() {
      return this.item.creator == localStorage.getItem("login");
    }
  }
};
</script>