<template>
  <div class="ListOfParticipants">
    <form @submit.prevent="addItem()" class="container" v-if="!this.ended && admin">
      <h3>Dodaj nowego uczestnika:</h3>
      <b-form-row>
        <b-col>
          <b-input
            lg="5"
            type="text"
            name="participant"
            placeholder="Nazwa/Imię/Ksywka"
            v-model="name"
          />
        </b-col>
        <b-button type="submit" class="btn-outline-success btn-light px-2">
          Dodaj
          <i class="fas fa-plus-square"></i>
        </b-button>
      </b-form-row>
    </form>
    <b-button
      class="col-sm btn-outline-success btn-light"
      v-if="!this.ended && !admin && !alreadyAdded"
      @click="addMe"
    >
      Dodaj mnie
      <i class="fas fa-plus-square"></i>
    </b-button>
    <ul class="overflow-auto px-2">
      <p v-if="list.length==0">
        Jak dotąd nie zapisano żadnego uczestnika,
        <span
          v-if="!this.ended && admin"
        >dopisz go w polu powyżej.</span>
      </p>
      <li class="border-bottom w-auto" v-for="(item, index) in list" :key="index">
        <component
          :is="admin ? 'item-admin':'item'"
          :item="Object.assign(item, {index: index})"
          @remove="remove"
        ></component>
      </li>
    </ul>
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
  max-height: 20.3rem;
  margin-top: 2px;
  -webkit-overflow-scrolling: touch;
  border-color: #ced4da;
}
</style>
