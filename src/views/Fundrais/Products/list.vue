<template>
  <div class="ListOfProducts">
    <form class="container" @submit.prevent="addNewItem" v-if="admin">
      <label>Dodaj cel zbiórki</label>
      <b-form-row>
        <b-col sm="6" lg="2" class="px-0">
          <b-input type="number" v-model="newItem.number" min="0" placeholder="Ilość"/>
        </b-col>
        <b-col sm="6" lg="5">
          <b-input type="text" v-model="newItem.name" placeholder="Nazwa"/>
        </b-col>
        <b-col sm="6" lg="2" class="px-0">
          <b-input type="number" v-model="newItem.price" min="0" placeholder="Cena jednostkowa"/>
        </b-col>
        <b-col>
          <b-button type="submit">Dodaj</b-button>
        </b-col>
      </b-form-row>
    </form>
    <!-- displaying a list of Participant, create new component to Item bind -->
    <ul class="overflow-auto px-3 container">
      <label v-if="!admin">Cel zbiórki:</label>
      <label
        v-if="list.length==0"
      >Lista produktów jest pusta, twórca zbiórki nie dodał jeszcze żadnego produktu</label>
      <li class="border-bottom w-auto" v-for="(item, index) in list" :key="index">
        <Item
          v-if="!admin"
          :item="{index: index, ...item}"
          @number="setNumber"
          @name="setName"
          @price="setPrice"
          @remove="removeItem"
        />
        <item-admin
          v-else
          :item="{index: index, ...item}"
          @number="setNumber"
          @name="setName"
          @price="setPrice"
          @remove="removeItem"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import Item from "@/views/Fundrais/Products/item.vue";
import ItemAdmin from "@/views/Fundrais/Products/item.admin.vue";

export default {
  props: {
    list: Array,
    admin: false
  },
  data() {
    return {
      newItem: {
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
      if (
        this.newItem.number.length == 0 ||
        this.newItem.price.length == 0 ||
        this.newItem.name.length == 0 ||
        this.newItem.number < 0 ||
        this.newItem.price < 0
      ) {
        alert("Wpisz poprawną wartość!");
      } else {
        this.list.push({
          number: parseInt(this.newItem.number),
          name: this.newItem.name,
          price: parseFloat(this.newItem.price)
        });
        this.newItem.number = "";
        this.newItem.name = "";
        this.newItem.price = "";
      }
    },
    setNumber(index) {
      let tmp = 0;
      do {
        tmp = parseInt(prompt("set new number"));
      } while (typeof tmp != "number" || tmp <= 0 || isNaN(tmp));
      if (typeof tmp == "number" && tmp > 0 && !isNaN(tmp)) {
        this.list[index].number = tmp;
      }
    },
    setName(index) {
      do {
        this.list[index].name = prompt("set new name");
      } while (this.list[index].name.length == 0);
    },
    setPrice(index) {
      let tmp = 0;
      do {
        tmp = parseFloat(prompt("set new price"));
      } while (typeof tmp != "number" || tmp <= 0 || isNaN(tmp));
      if (typeof tmp == "number" && tmp > 0 && !isNaN(tmp)) {
        this.list[index].price = tmp;
      }
    },
    removeItem(index) {
      this.list.splice(index, 1);
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
  max-height: 15.9rem;
  -webkit-overflow-scrolling: touch;
  border-color: #ced4da;
  list-style: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

