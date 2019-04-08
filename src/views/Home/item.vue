<template>
  <div class="bg-white">
    <div class="row">
      <div class="col text-left p-0">
        <router-link class="text-dark h5" :to="{name: 'Fundrais', params: {id: item.id}}">
          <span>{{item.title}}</span>
        </router-link>
      </div>
      <div class="col text-center p-0">
        <wizard :inStage="wizardStage" :isEditing="false"/>
      </div>
      <div class="col text-right p-0">
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
          <span class="d-none d-lg-inline">Usuń</span>
        </b-button>
      </div>
    </div>
    <div class="row" :class="{'border-bottom': item.description.length}">
      <div class="col p-0 text-left">
        twórca:
        <strong>{{item.creator}}</strong>
      </div>
      <div class="col p-0 text-right">
        <span v-if="item.endDate < new Date(Date.now())">Zbiórka zakończona</span>
        <span v-else>
          Zbiórka trwa do
          <strong class="text-danger">{{ item.endDate | moment("LL")}}</strong>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col p-0">
        <div v-if="item.description.length > 80 && !descriptionShow">
          <p class="d-inline">{{ellipsis(item.description, 80).slice(0, -3)}}</p>&nbsp;
          <a
            class="text-muted"
            @click="descriptionShow=!descriptionShow"
            data-toggle="tooltip"
            data-placement="auto"
            v-b-tooltip.hover
            title="Pokaż opis"
          >(...)</a>
        </div>
        <div v-else-if="item.description.length > 80">
          <p class="d-inline">{{item.description}}</p>&nbsp;
          <a @click="descriptionShow=!descriptionShow" title="Ukryj opis">(Ukryj opis)</a>
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
import Wizard from "@/components/wizard.vue";
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
    },
    isAfterDate() {
      return new Date(this.item.endDate).getTime() < Date.now();
    },
    wizardStage() {
      if (!this.isAfterDate) {
        if (this.item.ended) {
          return 2;
        } else {
          return 1;
        }
      } else {
        return 3;
      }
    }
  },
  components: {
    Wizard
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
a {
  cursor: pointer;
}
</style>
