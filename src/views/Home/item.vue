<template>
  <div class="container-fluid w-100 mb-1 bg-white">
    <div class="row border-bottom">
      <div class="col-sm-5">
        <router-link class="text-dark" :to="{name: 'Fundrais', params: {id: item.id}}">
          <div class="row">
            <h4 class="mr-1">{{item.title}}</h4>
          </div>
        </router-link>
        <div class="row">
          <h6 class="font-weight-light">twórca:
            <h6 class="d-inline">
              <strong>{{item.creator}}</strong>
            </h6>
          </h6>
        </div>
      </div>
      <div class="col mt-4 px-0">
        <div class="d-inline">
          <h4 class="text-danger" v-if="item.endDate < new Date(Date.now())">Zbiórka zakończona</h4>
          <h4 class="text-warning" v-else-if="item.ended">Dokonaj zapłaty</h4>
          <h4 class="text-success" v-else>Zbiórka w trakcie</h4>
        </div>
      </div>
      <div class="col text-lg-right pt-4 pr-1">
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
      <hr>
    </div>
    <div>
      <div class="col">
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
    <b-modal
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
  props: {
    item: Object
  },
  data() {
    return {
      click: false,
      showModal: false
    };
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
