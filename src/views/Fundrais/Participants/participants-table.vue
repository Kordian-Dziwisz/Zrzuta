<template>
  <b-card class="border rounded" no-body>
    <!-- <b-card-header class="w-100 shadow-sm h4"></b-card-header> -->
    <b-card-title class="p-2">
      <h3>
        <span>Uczestnicy</span>
        <b-badge
          pill
          variant="primary"
          class="float-right"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Liczba uczestników"
          v-if="list.length && alreadyAdded"
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
      <form
        autocomplete="off"
        @submit.prevent="addNew"
        v-if="!this.isEnded && (isAuthenticated || isAdmin)"
      >
        <label for="userNameValidation" v-if="isAdmin">Dodaj nowego uczestnika:</label>
        <div class="input-group">
          <template v-if="isAdmin">
            <b-input
              id="userNameValidation"
              type="text"
              placeholder="Nazwa/Imię/Ksywka"
              v-model="name"
              :state="dirty ? validation : null"
              @update="name.length ? dirty=true : dirty=false"
              @blur="dirty = false"
              @focus="name.length ? dirty = true : dirty = false"
              required
            />
            <b-form-invalid-feedback>Nazwa uczestnika musi mieć powyżej 3 znaków!</b-form-invalid-feedback>
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
      <div class="h5 row" v-else-if="list.length">
        <div class="text-success text-center col-12 col-lg-4">
          <a
            @click="filter == 'zapłacone' ? filter = 'none' : filter = 'zapłacone'"
          >Zapłacone: {{paidAcceptedAndNot.accepted}}</a>
        </div>
        <div class="text-primary col text-center col-12 col-lg-4">
          <a
            @click="filter == 'wpłacone' ? filter = 'none' : filter = 'wpłacone'"
          >Wpłacone: {{paidAcceptedAndNot.paid}}</a>
        </div>
        <div class="col text-center col-12 col-lg-4">
          <a
            @click="filter == 'pozostało' ? filter = 'none' : filter = 'pozostało'"
          >Pozostało: {{paidAcceptedAndNot.not}}</a>
        </div>
      </div>
      <b-alert variant="warning" class="text-dark mt-2" v-if="list.length==0">
        Nie zapisano żadnego uczestnika,
        <span
          v-if="!this.isEnded && isAdmin"
        >dopisz go w polu powyżej.</span>
      </b-alert>
      <table v-else class="table table-striped border mt-2 mb-0">
        <tbody>
          <tr v-for="(item, index) in filteredList" :key="index">
            <td
              class="pl-3"
              :class="{'acceptedBar':item.accepted, 'paidBar':item.paid&&!item.accepted}"
            >
              <div>
                {{item.name}}
                <a
                  @click="showCommentIndex=index"
                  v-if="item.comment && showCommentIndex != index"
                  class="small text-muted d-block d-lg-inline"
                >
                  <i class="fas fa-comment-dots fa-fw"></i>
                </a>
                <a
                  v-else-if="isYour(item.name)"
                  class="small text-muted d-block"
                  h
                  @click="editComment(index)"
                >
                  <i class="fas fa-comment-medical fa-fw"></i>
                  {{item.comment ? 'Edytuj' : 'Dodaj komentarz'}}
                </a>
              </div>
              <span v-if="showCommentIndex==index" class="text-muted">{{item.comment}}</span>
            </td>
            <td class="text-right pr-1">
              <div
                class="d-inline"
                :class="{'text-primary': item.paid, 'text-success': item.accepted}"
              >{{item.accepted ? "zapłacił/a " : item.paid ? "wpłacił/a " : ""}}</div>

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
                v-if="isYour(item.name) && !item.paid && !item.accepted && isEnded && !isAdmin"
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
                v-if="(isAdmin || isYour(item.name)) && !isEnded"
                @click="showRemoveModal = true; removeIndex=index"
              >
                <i class="fas fa-trash-alt fa-fw"></i>
                <span class="d-none d-lg-inline"></span>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-card-body>
    <!-- comment modal -->
    <b-modal
      id
      @hide="showCommentModal = false"
      :hide-header-close="true"
      :lazy="true"
      :title="editCommentIndex==null ? '' : list[editCommentIndex].comment ? 'Edytuj komentarz' : 'Dodaj komentarz' "
      v-model="showCommentModal"
    >
      <form @submit.prevent="saveComment()">
        <b-form-row>
          <label for="editCommentInput">Komentarz:</label>
          <b-form-textarea
            id="editCommentInput"
            name="name"
            v-model.trim="newComment"
            novalidate
            max-rows="6"
            placeholder="Wpisz komentarz"
          ></b-form-textarea>
        </b-form-row>
      </form>
      <div slot="modal-footer" class="w-100">
        <b-button
          class="float-right ml-1"
          variant="outline-success light"
          @click="saveComment()"
        >Zapisz</b-button>
        <b-button
          class="float-right"
          variant="outline-secondary light"
          @click="showCommentModal = false"
        >Anuluj</b-button>
      </div>
    </b-modal>

    <!-- remove modal -->
    <b-modal
      v-model="showRemoveModal"
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
          @click="showRemoveModal = false"
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
      newComment: "",
      showRemoveModal: false,
      showCommentModal: false,
      showCommentIndex: null,
      editCommentIndex: null,
      filter: "none"
    };
  },
  methods: {
    editComment(index) {
      this.newComment = this.list[index].comment;
      this.editCommentIndex = index;
      this.showCommentModal = true;
      this.showCommentIndex = index;
    },
    saveComment(index) {
      this.list[this.editCommentIndex].comment = this.newComment;
      this.showCommentModal = false;
      if (this.newComment.length) {
      }
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
      this.showRemoveModal = false;
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
    },
    isYour(name) {
      return name == localStorage.getItem("login");
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
    filteredList() {
      switch (this.filter) {
        case "none":
          return this.list.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        case "zapłacone":
          return this.list
            .filter(item => {
              return item.accepted;
            })
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
        case "wpłacone":
          return this.list
            .filter(item => {
              return item.paid && !item.accepted;
            })
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
          break;
        case "pozostało":
          return this.list
            .filter(item => {
              return !item.paid && !item.accepted;
            })
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
          break;
        default:
          return this.list;
          break;
      }
    },
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
      return this.name.length >= 3;
    },
    isAuthenticated() {
      return this.list.find(item => item.name == localStorage.getItem("login")) != null;
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
.acceptedBar {
  box-shadow: inset 6px 0px 0px 0px #28a745 !important;
}
.paidBar {
  box-shadow: inset 6px 0px 0px 0px #007bff !important;
}
a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
