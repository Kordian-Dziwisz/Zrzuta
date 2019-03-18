<template>
  <b-card class="border rounded">
    <!-- <b-card-header class="w-100 shadow-sm h4"></b-card-header> -->
    <b-card-title>
      <h3>
        <span>Uczestnicy</span>
        <span class="float-right small" v-if="list.length">łącznie: {{list.length}}</span>
      </h3>
    </b-card-title>
    <b-card-body>
      <form @submit.prevent="addNew" v-if="!this.isEnded">
        <label>Dodaj nowego uczestnika:</label>
        <div class="form-row">
          <div class="col" v-if="isAdmin">
            <!-- <label class="h6 font-weight-normal" for="userName">Dodaj nowego uczestnika</label> -->
            <b-input
              class="d-inline"
              id="userName"
              type="text"
              placeholder="Nazwa/Imię/Ksywka"
              maxlength="30"
              v-model="name"
              :state="validation"
            />
            <b-form-invalid-feedback :state="validation">Weno nie psuj :( Daj tu od 3 do 30 znaków!</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">Dawaj dawaj!! Tak trzymaj!!!</b-form-valid-feedback>
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
              <i class="fas fa-plus-square"></i>
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
              <i class="fas fa-plus-square"></i>
              Dodaj mnie
            </b-button>
          </div>
        </div>
      </form>
      <div class="h5 row" v-else>
        <div class="text-success col">Zaakceptowane: {{paidAcceptedAndNot.accepted}}</div>
        <div class="text-primary col text-center">Zapłacone: {{paidAcceptedAndNot.paid}}</div>
        <div class="col text-right">Pozostało: {{paidAcceptedAndNot.not}}</div>
      </div>
      <div class="row">
        <div class="col p-0">
          <ul>
            <b-alert :show="list.length==0" variant="warning" class="text-dark">
              Jak dotąd nie zapisano żadnego uczestnika,
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
      name: ""
    };
  },
  methods: {
    addNew() {
      if (this.name.length == 0) {
        alert("Pole nazwy nie może być puste!");
      } else {
        this.list.push({
          name: this.name,
          accepted: false,
          paid: false,
          comment: "",
          guid: localStorage.getItem("guid")
        });
        this.name = "";
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
