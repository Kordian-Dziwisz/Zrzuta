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
        <b-button type="submit" class="btn-outline-success btn-light">Dodaj</b-button>
      </b-form-row>
    </form>
    <b-button
      class="btn-outline-success btn-light"
      v-if="!this.ended && !admin && !alreadyAdded"
      @click="addMe"
    >Dodaj mnie</b-button>
    <ul class="overflow-auto px-3">
      <p v-if="list.length==0">
        Jak dotąd nie zapisano żadnego uczestnika,
        <span
          v-if="!this.ended && admin"
        >dopisz go w polu powyżej.</span>
      </p>
      <li class="border-bottom w-auto" v-for="(item, index) in list" :key="index">
        <item v-if="!admin" :item="Object.assign(item, {index: index})" @remove="remove"/>
        <item-admin v-else :item="Object.assign(item, {index: index})" @remove="remove"/>
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
        alert("name field can't be empty");
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
      this.list.push({
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
  max-height: 15.9rem;
  margin-top: 10px;
  -webkit-overflow-scrolling: touch;
  border-color: #ced4da;
}
</style>
