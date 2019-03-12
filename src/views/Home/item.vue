<template>
  <div class="container-fluid w-100 mb-1 bg-white">
    <div class="row border-bottom">
      <div class="col-sm-5">
        <div class="row">
          <h4 class="mr-1">{{item.title}}</h4>
        </div>
        <div class="row">
          <h6 class="font-weight-light">twórca:
            <h6 class="d-inline">
              <strong>{{item.creator}}</strong>
            </h6>
          </h6>
        </div>
      </div>
      <div class="col-sm-4 mt-4 px-0">
        <div class="d-inline">
          <h4 class="text-danger" v-if="item.endDate < new Date(Date.now())">Zbiórka zakończona</h4>
          <h4 class="text-warning" v-else-if="item.ended">Dokonaj zapłaty</h4>
          <h4 class="text-success" v-else>Zbiórka w trakcie</h4>
        </div>
      </div>
      <div class="col-lg-3 col-sm-3 text-lg-right pt-4 pr-1">
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
      </div>
      <hr>
    </div>
    <div>
      <div class="col-sm-7">
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
      </div>
      <div
        v-if="!item.endDate < new Date(Date.now())"
        class="col font-weight-light text-lg-right"
      >Zbiórka kończy się:
        <h6 class="text-danger d-inline">
          <strong>{{ item.endDate | moment("dddd, D MMMM YYYY")}} - {{ item.endDate | moment("H:mm")}}</strong>
        </h6>
      </div>
    </div>
  </div>
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
<style scoped>
b-collapse {
  white-space: pre;
  word-wrap: break-word;
}
</style>
