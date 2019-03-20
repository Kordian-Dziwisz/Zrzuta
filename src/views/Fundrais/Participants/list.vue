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
          v-if="list.length && authenticate"
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
          <i class="fas fa-pl`us`-square fa-fw"></i>
          Dodaj mnie
        </b-button>
      </h3>
    </b-card-title>
    <b-card-body>
      <form autocomplete="off" @submit.prevent="addNew" v-if="!this.isEnded && authenticate">
        <label for="userNameValidation" v-if="isAdmin">Dodaj nowego uczestnika:</label>
        <div class="form-row">
          <div class="col" v-if="isAdmin">
            <b-input
              class="d-inline form-control"
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
          </div>
          <br>
          <div class="col text-right">
            <b-button
              type="submit"
              class="d-box btn-outline-success btn-light"
              size="sm"
              data-toggle="tooltip"
              data-placement="auto"
              v-b-tooltip.hover
              title="Dodaj uczestnika"
              v-if="isAdmin"
            >
              <i class="fas fa-plus-square fa-fw"></i>
              Dodaj uczestnika
            </b-button>
            <b-button
              class="btn-outline-success btn-light ml-1"
              data-toggle="tooltip"
              data-placement="auto"
              v-b-tooltip.hover
              title="Dodaj siebie"
              v-if="!alreadyAdded"
              @click="addMe"
              size="sm"
            >
              <i class="fas fa-plus-square fa-fw"></i>
              Dodaj mnie
            </b-button>
          </div>
        </div>
      </form>
      <div class="h5 row" v-else-if="authenticate && list.length" :show="authenticate">
        <div class="text-success col">Zapłacone: {{paidAcceptedAndNot.accepted}}</div>
        <div class="text-primary col text-center">Wpłacone: {{paidAcceptedAndNot.paid}}</div>
        <div class="col text-right">Pozostało: {{paidAcceptedAndNot.not}}</div>
      </div>
      <div class="row" v-if="authenticate">
        <div class="col p-0">
          <ul>
            <b-alert :show="list.length==0" variant="warning" class="text-dark">
              Nie zapisano żadnego uczestnika,
              <span
                v-if="!this.isEnded && isAdmin"
              >dopisz go w polu powyżej.</span>
            </b-alert>
            <li v-for="(item, index) in list" :key="index">
              <item
                class="my-3"
                :isAdmin="isAdmin"
                :item="{...item, index: index}"
                :isEnded="isEnded"
                @remove="remove"
                @update="update"
                @saveComment="saveComment"
              ></item>
            </li>
          </ul>
        </div>
      </div>
    </b-card-body>
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
      dirty: false
    };
  },
  methods: {
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
      this.list.splice(index, 1);
    },
    update(item) {
      this.list[item.index] = { ...item };
      delete this.list[item.index].index;
      this.$emit("list", this.list);
    },
    saveComment() {
      this.$emit("saveComment", true);
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
    authenticate() {
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
