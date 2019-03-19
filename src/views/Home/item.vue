<template>
  <div class="container-fluid w-100 my-1 bg-white">
    <div class="row">
      <div class="col-sm-5 ml-1">
        <router-link class="text-dark" :to="{name: 'Fundrais', params: {id: item.id}}">
          <div class="row">
            <h4>{{item.title}}</h4>
          </div>
        </router-link>
      </div>
      <div class="col text-lg-right px-1">
        <b-button
          class="btn-outline-danger btn-light"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          title="Usuń"
          v-if="isYour"
          v-b-tooltip.hover
          @click="showModal = true"
        >
          <i class="fas fa-trash-alt fa-fw"></i>
          Usuń
        </b-button>
      </div>
    </div>
    <div class="row" :class="{'border-bottom': item.description.length}">
      <div class="col">
        <span>
          twórca:
          <strong class="d-inline">{{item.creator}}</strong>
        </span>
      </div>
      <div class="col text-right">
        <span class="text-dark" v-if="item.endDate < new Date(Date.now())">Zbiórka zakończona</span>
        <span class="text-danger" v-else-if="item.ended">Dokonaj zapłaty</span>
        <span class="text-warning" v-else>
          Zbiórka trwa do
          <strong class="d-inline">{{ item.endDate | moment("LL")}}</strong>
        </span>
      </div>
    </div>
    <!-- v-if="item.description.length > 80 && !descriptionShow" -->
    <!-- <b-collapse v-model="click" id>{{item.description}}</b-collapse>
          <b-button
            class="btn-outline-secondary btn-light text-center"
            @click="click = !click"
            size="sm"
          >
            <span v-if="!click">Pokaż opis</span>
            <span v-else>Ukryj opis</span>
    </b-button>-->
    <div class="row">
      <div class="col">
        <div v-if="item.description.length > 80 && !descriptionShow">
          <h6 class="d-inline">{{ellipsis(item.description, 80).slice(0, -3)}}</h6>
          <b-button
            class="d-inline btn-light btn-outline-secondary mx-1"
            @click="descriptionShow=!descriptionShow"
            size="sm"
          >Pokaż opis</b-button>
        </div>
        <div v-else-if="item.description.length > 80">
          <h6 class="d-inline">{{item.description}}</h6>
          <b-button
            class="d-inline text-dark btn-light btn-outline-secondary mx-1"
            @click="descriptionShow=!descriptionShow"
            size="sm"
          >Ukryj opis</b-button>
        </div>
        <div v-else>
          <h6>{{item.description}}</h6>
        </div>
      </div>
    </div>

    <b-modal
      :hide-header-close="true"
      v-model="showModal"
      id
      :lazy="true"
      header-bg-variant="danger"
      header-text-variant="light"
      title="Potwierdzenie usunięcia"
      size="lg"
    >
      <div class="container fluid">
        <div class="row text-center">
          <strong
            class="h4"
          >Czy jesteś pewny, że chcesz usunąć zrzutkę? Ten proces jest nieodwracalny! Nawet administrator tego nie naprawi!</strong>
        </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <b-button class="float-right ml-1" variant="outline-danger light" @click="remove()">
          <i class="fas fa-trash-alt fa-fw"></i>Usuń
        </b-button>
        <b-button
          class="float-right"
          variant="outline-secondary light"
          @click="showModal= false"
        >Anuluj</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      ellipsis: require("text-ellipsis"),
      descriptionShow: false
    };
  },
  props: {
    item: Object
  },
  methods: {
    remove() {
      this.$emit("remove", {
        index: this.item.index,
        id: this.item.id
      });
      this.showModal = false;
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
strong {
  word-break: normal;
}
</style>
