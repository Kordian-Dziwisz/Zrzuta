<template>
  <div class="ListOfParticipants">
    <form @submit.prevent="addItem()" class="container" v-if="!this.ended && admin">
      <h3>Dodaj nowego uczestnika:</h3>
      <b-form-row>
        <div class="col-lg-9">
          <b-input
            type="text"
            name="participant"
            maxlength="30"
            placeholder="Nazwa/Imię/Ksywka"
            v-model="name"
          />
        </div>
        <div class="row-lg-3">
          <b-button type="submit" class="btn-outline-success btn-light">
            <i class="fas fa-plus-square fa-fw"></i>
            Dodaj
          </b-button>
        </div>
        <div class="row-lg-3">
          <b-button
            class="btn-outline-success btn-light"
            v-if="!this.ended && !alreadyAdded"
            @click="addMe"
          >
            <i class="fas fa-plus-square"></i>
            Dodaj mnie
          </b-button>
        </div>
        <div class="d-flex justify-content-center"></div>
      </b-form-row>
    </form>
    <div>
      <ul>
        <b-alert :show="list.length==0" variant="warning" class="text-dark">
          Jak dotąd nie zapisano żadnego uczestnika,
          <span
            v-if="!this.ended && admin"
          >dopisz go w polu powyżej.</span>
        </b-alert>
        <li class="border-bottom" v-for="(item, index) in list" :key="index">
          <component
            :is="admin ? 'item-admin':'item'"
            :item="Object.assign(item, {index: index})"
            :ended="ended"
            @remove="remove"
          ></component>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Item from "@/views/Fundrais/Participants/item.vue";
import ItemAdmin from "@/views/Fundrais/Participants/item.admin.vue";

export default {
  props: {
    list: Array,
    admin: Boolean,
    ended: Boolean
  },
  data() {
    return {
      name: ""
    };
  },
  watch: {
    list: {
      handler() {
        this.$emit("list", this.list);
      },
      deep: true
    }
  },
  methods: {
    addItem() {
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
    }
  },
  components: {
    Item,
    ItemAdmin
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
