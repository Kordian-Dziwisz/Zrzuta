<template>
  <div>
    <div v-if="!admin">
      here add a new Proposition
      <input
        type="number"
        name="quantity"
        v-model="newItem.number"
        @keypress.enter="addNewItem"
        min="0"
      >
      <input type="text" name="name" v-model="newItem.name" @keypress.enter="addNewItem">
      <input
        type="number"
        name="price"
        v-model="newItem.price"
        @keypress.enter="addNewItem"
        min="0"
      >
      <button @click="addNewItem">add new item</button>
    </div>
    <ul>
      <p v-if="list.length==0">List is empty</p>
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

export default {
  props: {
    list: Array,
    admin: false
  },
  data() {
    return {
      newItem: {
        creator: "",
        accepted: false,
        number: 0,
        name: "",
        price: 0.0,
        likes: [],
        dislikes: []
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
      if (
        this.newItem.name.length == 0 ||
        this.newItem.number < 0 ||
        this.newItem.price < 0
      ) {
        alert("Wpisz poprawną wartość!");
      } else {
        this.list.push({ ...this.newItem });
        this.newItem.number = 0;
        this.newItem.name = "";
        this.newItem.price = 0.0;
        this.newItem.likes = [];
        this.newItem.dislikes = [];
      }
    },
    removeItem(index) {
      this.list.splice(index, 1);
    },
    likeItem(index) {
      if (!this.list[index].likes.includes(localStorage.getItem("login"))) {
        this.list[index].likes.push(localStorage.getItem("login"));
      }
      this.$emit("list", this.list);
    },
    dislikeItem(index) {
      if (!this.list[index].dislikes.includes(localStorage.getItem("login"))) {
        this.list[index].dislikes.push(localStorage.getItem("login"));
      }
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

