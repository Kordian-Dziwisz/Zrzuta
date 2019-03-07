<template>
  <div v-if="!this.ended">
    <div class="container pt-3">
      <h3>Dodaj nową propozycję</h3>
      <form @submit.prevent="addNew">
        <b-form-row>
          <span class="col-lg-5 col-sm-6 px-0 mr-1">
            <b-input type="text" name="name" placeholder="Nazwa" v-model="newItem.name"/>
          </span>
          <span class="col-lg-2 col-sm-6 px-0">
            <b-input
              type="number"
              name="quantity"
              v-model="newItem.number"
              min="0"
              placeholder="Ilość"
              onfocus="this.value=''"
            />
          </span>
          <span class="col-lg-2 col-sm-6 px-0 ml-1">
            <b-input
              type="number"
              name="price"
              v-model="newItem.price"
              step="0.01"
              min="0"
              placeholder="Cena"
            />
          </span>
          <span class="ml-1">
            <b-button type="submit" class="btn-outline-success btn-light px-2">
              Dodaj
              <i class="fas fa-plus-square"></i>
            </b-button>
          </span>
        </b-form-row>
      </form>
    </div>
    <h3 v-if="list.length==0">Nie zgłoszono żadnych propozycji</h3>
    <table class="table table-light table-striped bordercontainer">
      <thead>
        <tr>
          <th>
            <b-row class="ml-4">
              <b-col class="pl-0 col-lg-2 align-self-center overflow-hidden text-left">Twórca</b-col>
              <b-col class="pl-2 col-lg-2 align-self-center overflow-hidden text-left">Nazwa</b-col>
              <b-col class="pr-0 col-lg-4 align-self-center overflow-hidden text-center">Ilość</b-col>
              <b-col class="pl-0 col-lg-2 align-self-center overflow-hidden text-left">Cena</b-col>
              <b-col class="pl-0 col-lg-2 align-self-center overflow-hidden text-left">Głosy</b-col>
            </b-row>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>
            <Item
              v-if="!admin"
              :item="{index: index, ...item}"
              @like="like"
              @dislike="dislike"
              @remove="remove"
              @accept="accept"
            />
            <item-admin
              v-else
              :item="{index: index, ...item}"
              @like="like"
              @dislike="dislike"
              @remove="remove"
              @accept="accept"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Item from "@/views/Fundrais/Propositions/item.vue";
import ItemAdmin from "@/views/Fundrais/Propositions/item.admin.vue";
import { parse } from "@fortawesome/fontawesome-svg-core";

export default {
  props: {
    list: Array,
    admin: Boolean,
    ended: Boolean
  },
  data() {
    return {
      newItem: {
        creator: "",
        number: "",
        name: "",
        price: ""
      }
    };
  },
  watch: {
    list() {
      this.$emit("list", this.list);
    }
  },
  methods: {
    addNew() {
      if (this.newItem.name.length == 0 || this.newItem.number.length == 0 || this.newItem.price.length == 0) {
        alert("Wpisz poprawną wartość!");
      } else {
        this.list.push({
          creator: this.newItem.creator,
          name: this.newItem.name,
          number: parseInt(this.newItem.number),
          price: parseFloat(this.newItem.price),
          accepted: false,
          likes: [],
          dislikes: []
        });
        this.newItem.number = "";
        this.newItem.name = "";
        this.newItem.price = "";
      }
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    like(index) {
      if (this.list[index].dislikes.includes(localStorage.getItem("login"))) {
        this.list[index].dislikes.splice(this.list[index].dislikes.indexOf(localStorage.getItem("login"), 1));
      }
      this.list[index].likes.push(localStorage.getItem("login"));
      this.$emit("list", this.list);
    },
    dislike(index) {
      if (this.list[index].likes.includes(localStorage.getItem("login"))) {
        this.list[index].likes.splice(this.list[index].dislikes.indexOf(localStorage.getItem("login"), 1));
      }

      this.list[index].dislikes.push(localStorage.getItem("login"));
      this.$emit("list", this.list);
    },
    accept(index) {
      this.list[index].accepted = true;
      this.$emit("list", this.list);
      this.list.splice(index, 1);
    }
  },
  created() {
    this.newItem.creator = localStorage.getItem("login");
  },
  components: {
    Item,
    ItemAdmin
  }
};
</script>
<style scoped>
ul {
  -webkit-overflow-scrolling: touch;
  z-index: 20;
  list-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


