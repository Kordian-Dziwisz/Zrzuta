<template>
  <b-card class="border rounded">
    <!-- <b-card-header class="w-100 shadow-sm h4"></b-card-header> -->
    <b-card-title>
      <h3>
        <span>Uczestnicy</span>
        <b-badge
          pill
          variant="primary"
          class="float-right"
          v-if="list.length && isAuthenticated"
        >{{list.length}}</b-badge>
        <b-button
          class="btn-outline-success btn-light ml-1 float-right"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Dodaj siebie"
          v-else-if="!alreadyAdded && !isAdmin"
          @click="addMe"
          size="sm"
        >
          <i class="fas fa-plus fa-fw"></i>
          Dodaj mnie
        </b-button>
      </h3>
    </b-card-title>
    <b-card-body>
      <form autocomplete="off" @submit.prevent="addNew" v-if="!this.isEnded && isAuthenticated">
        <label for="userNameValidation" v-if="isAdmin">Dodaj nowego uczestnika:</label>
        <div class="input-group">
          <template v-if="isAdmin">
            <b-input
              id="userNameValidation"
              type="text"
              placeholder="Nazwa/Imię/Ksywka"
              maxlength="30"
              v-model="name"
              :state="dirty ? validation : null"
              @update="name.length ? dirty=true : dirty=false"
              @blur="dirty = false"
              @focus="name.length ? dirty = true : dirty = false"
              required
            />
            <b-form-invalid-feedback>Nazwa uczestnika musi mieć od 3 do 30 znaków!</b-form-invalid-feedback>
            <b-button
              type="submit"
              class="btn-outline-success btn-light mx-1"
              size="sm"
              data-toggle="tooltip"
              data-placement="auto"
              v-b-tooltip.hover
              title="Dodaj uczestnika"
              v-if="isAdmin"
            >
              <i class="fas fa-plus fa-fw"></i>
              Dodaj
            </b-button>
          </template>
          <b-button
            class="btn-outline-success btn-light"
            data-toggle="tooltip"
            data-placement="auto"
            v-b-tooltip.hover
            title="Dodaj siebie"
            v-if="!alreadyAdded"
            @click="addMe"
            size="sm"
          >
            <i class="fas fa-plus fa-fw"></i>
            Dodaj mnie
          </b-button>
        </div>
      </form>
      <div class="h5 row" v-else-if="isAuthenticated && list.length">
        <div class="text-success col">Zapłacone: {{paidAcceptedAndNot.accepted}}</div>
        <div class="text-primary col text-center">Wpłacone: {{paidAcceptedAndNot.paid}}</div>
        <div class="col text-right">Pozostało: {{paidAcceptedAndNot.not}}</div>
      </div>
      <b-alert variant="warning" class="text-dark mt-2" v-if="list.length==0">
        Nie zapisano żadnego uczestnika,
        <span
          v-if="!this.isEnded && isAdmin"
        >dopisz go w polu powyżej.</span>
      </b-alert>
      <table v-else class="table table-striped border">
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>
              <h5>
                {{item.name}}
                <span
                  class="small"
                  :class="{'text-success': item.accepted, 'text-primary': item.paid}"
                >{{item.accepted ? "zapłacił/a" : item.paid ? "wpłacił/a" : ""}}</span>
                <a v-if="isAuthenticated" style="cursor: pointer"></a>
                <a
                  style="cursor: pointer"
                  @click="showComment==index ? showComment=null : showComment=index"
                  class="small bg-transparent outline-none"
                >{{item.comment ? showComment==index ? ' schowaj komentarz':' pokaż komentarz' : ''}}</a>
              </h5>
              <h6 v-if="showComment==index">{{item.comment}}</h6>
            </td>
            <td class="text-right">
              <!-- accept -->
              <b-button
                class="btn-outline-success btn-light mr-1"
                size="sm"
                data-placement="auto"
                v-b-tooltip.hover
                title="Zapłacone"
                v-if="!item.accepted && isEnded && isAdmin"
                @click="accept(index)"
              >
                <i class="fas fa-vote-yea fa-fw"></i>
                <span class="d-none d-lg-inline">Zapłacił/a</span>
              </b-button>

              <!-- pay -->
              <b-button
                class="btn-outline-primary btn-light"
                size="sm"
                data-toggle="tooltip"
                data-placement="auto"
                v-b-tooltip.hover
                title="Zapłacone"
                v-if="isAuthenticated && !item.paid && !item.accepted && isEnded && !isAdmin"
                @click="pay(index)"
              >
                <i class="fas fa-vote-yea fa-fw"></i>
                <span class="d-none d-lg-inline">Wpłaciłem/am</span>
              </b-button>

              <!-- remove -->
              <b-button
                class="btn-outline-danger btn-light"
                size="sm"
                data-toggle="tooltip"
                data-placement="auto"
                v-b-tooltip.hover
                title="Usuń uczestnika"
                v-if="(isAdmin || isAuthenticated) && !isEnded"
                @click="showModal = true; removeIndex=index"
              >
                <i class="fas fa-trash-alt fa-fw"></i>
                <span class="d-none d-lg-inline"></span>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-card-body>
    <b-modal
      v-model="showModal"
      id
      :hide-header-close="true"
      :lazy="true"
      header-bg-variant="danger"
      header-text-variant="light"
      title="Potwierdzenie usunięcia"
      size="md"
    >
      <div class="container fluid">
        <div class="row text-center">
          <strong
            class="h5"
          >Czy jesteś pewny, że chcesz usunąć uczestnika? Ten proces jest nieodwracalny! Nawet administrator tego nie naprawi!</strong>
        </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <b-button
          class="float-right ml-1"
          variant="outline-danger light"
          @click="remove(removeIndex)"
        >
          <i class="fas fa-trash-alt fa-fw"></i>Usuń
        </b-button>
        <b-button
          class="float-right"
          variant="outline-secondary light"
          @click="showModal = false"
        >Anuluj</b-button>
      </div>
    </b-modal>
  </b-card>
</template>
<script>
import Item from "@/views/Fundrais/Participants/Item.vue";

export default {
  props: {
    list: Array,
    isAdmin: Boolean,
    isEnded: Boolean
  },
  data() {
    return {
      name: "",
      dirty: false,
      showModal: false,
      showComment: null
    };
  },
  methods: {
    showComment(index) {
      console.log(index);
    },
    addNew() {
      if (this.validation) {
        this.list.push({
          name: this.name,
          accepted: false,
          paid: false,
          comment: "",
          guid: localStorage.getItem("guid")
        });
        this.name = "";
        this.dirty = false;
      }
    },
    addMe() {
      this.list.unshift({
        name: localStorage.getItem("login"),
        accepted: false,
        paid: false,
        comment: "",
        guid: localStorage.getItem("guid")
      });
    },
    remove(index) {
      this.showModal = false;
      this.list.splice(index, 1);
    },
    update(item) {
      this.list[item.index] = { ...item };
      delete this.list[item.index].index;
      this.$emit("list", this.list);
    },
    accept(index) {
      this.list[index].accepted = true;
    },
    pay(index) {
      if (this.list[index].accepted == false) {
        this.list[index].paid = true;
      }
    }
  },
  watch: {
    list: {
      handler() {
        this.$emit("list", this.list);
      },
      deep: true
    }
  },
  computed: {
    alreadyAdded() {
      let flag = false;
      this.list.forEach(item => {
        if (item.name == localStorage.getItem("login")) {
          flag = true;
        }
      });
      return flag;
    },
    paidAcceptedAndNot() {
      let paid = 0,
        accepted = 0,
        not = 0;
      this.list.forEach(item => {
        if (item.accepted) {
          accepted++;
        } else if (item.paid) {
          paid++;
        } else {
          not++;
        }
      });
      return { paid: paid, accepted: accepted, not: not };
    },
    validation() {
      return this.name.length >= 3 && this.name.length < 30;
    },
    isAuthenticated() {
      return this.list.find(item => item.name == localStorage.getItem("login")) != null || this.isAdmin;
    }
  },
  components: {
    Item
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin-top: 2px;
  -webkit-overflow-scrolling: touch;
  border-color: #ced4da;
  padding: 0 1rem;
}
</style>
