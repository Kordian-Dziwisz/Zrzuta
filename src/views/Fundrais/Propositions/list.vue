<template>
  <div>
    <div class="container pt-3">
      <h3 v-if="admin">Lista propozycji</h3>
      <h3>Dodaj nową propozycję</h3>
      <form @submit.prevent="addNewItem">
        <b-form-row>
          <b-col sm="6" lg="2" class="px-0">
            <b-input
              type="number"
              name="quantity"
              v-model="newItem.number"
              min="0"
              placeholder="Ilość"
              onfocus="this.value=''"
            />
          </b-col>
          <b-col sm="6" lg="5">
            <b-input type="text" name="name" placeholder="Nazwa" v-model="newItem.name"/>
          </b-col>
          <b-col sm="6" lg="2" class="px-0">
            <b-input type="number" name="price" v-model="newItem.price" min="0" placeholder="Cena"/>
          </b-col>
          <b-col>
            <b-button type="submit" class="btn-outline-success btn-light">Dodaj</b-button>
          </b-col>
        </b-form-row>
      </form>
    </div>
    <ul class="overflow-auto">
      <h3 v-if="list.length==0">Nie zgłoszono żadnych propozycji</h3>
      <li v-for="(item, index) in list" :key="index">
        <!-- create a new componen to display item -->
        <Item
          v-if="!admin"
          :item="{index: index, ...item}"
          @like="likeItem"
          @dislike="dislikeItem"
          @remove="removeItem"
          @accept="acceptItem"
        />
        <item-admin
          v-else
          :item="{index: index, ...item}"
          @like="likeItem"
          @dislike="dislikeItem"
          @remove="removeItem"
          @accept="acceptItem"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import Item from "@/views/Fundrais/Propositions/item.vue";
import ItemAdmin from "@/views/Fundrais/Propositions/item.admin.vue";
import { parse } from "@fortawesome/fontawesome-svg-core";

export default {
  props: {
    list: Array,
    admin: Boolean
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
    addNewItem() {
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
    removeItem(index) {
      this.list.splice(index, 1);
    },
    likeItem(index) {
      if (this.list[index].dislikes.includes(localStorage.getItem("login"))) {
        this.list[index].dislikes.splice(this.list[index].dislikes.indexOf(localStorage.getItem("login"), 1));
      }
      this.list[index].likes.push(localStorage.getItem("login"));
      this.$emit("list", this.list);
    },
    dislikeItem(index) {
      if (this.list[index].likes.includes(localStorage.getItem("login"))) {
        this.list[index].likes.splice(this.list[index].dislikes.indexOf(localStorage.getItem("login"), 1));
      }

      this.list[index].dislikes.push(localStorage.getItem("login"));
      this.$emit("list", this.list);
    },
    acceptItem(index) {
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
  max-height: 15rem;
  -webkit-overflow-scrolling: touch;
  z-index: 20;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


