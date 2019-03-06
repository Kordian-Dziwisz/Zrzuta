<template>
  <div class="ListOfProducts">
    <form class="container" @submit.prevent="addItem" v-if="admin && !this.ended">
      <h3>Dodaj cel zbiórki</h3>
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
          <b-button type="submit" class="btn btn-outline-success btn-light">Dodaj</b-button>
        </b-col>
      </b-form-row>
    </form>
    <div class="container">
      <tr>
        <td class="h5">Suma: {{priceSum + " zł"}}</td>&nbsp;
        <td class="h5">
          Na osobę: {{parseFloat(pricePerUser).toFixed(2) }}
          <span v-if="pricePerUser >= 0">zł</span>
        </td>
      </tr>
      <tr></tr>
    </div>
    <ul class="overflow-auto px-3 container">
      <label class="h5" v-if="!admin && !this.ended">Cel zbiórki:</label>
      <label
        v-if="list.length==0 && !admin"
      >Lista produktów jest pusta, twórca zbiórki nie dodał jeszcze żadnego produktu.</label>
      <label v-if="list.length==0 && admin">Lista produktów jest pusta, dodaj nowy cel powyżej.</label>
      <li class="border-bottom w-auto" v-for="(item, index) in list" :key="index">
        <component :is="admin ? 'item-admin':'item'" :item="Object.assign(item, {index: index})"
          @number="number"
          @name="name"
          @price="price"
          @remove="remove"
        ></component>
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
    admin: false,
    numOfParticipants: Number,
    ended: Boolean
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
    list: {
      handler(){
        this.$emit("list", this.list);
      },
      deep: true
    }
  },
  methods: {
    addItem() {
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
    number(index) {
      let tmp = 0;
      do {
        tmp = parseInt(prompt("Ustaw nową ilość"));
      } while (typeof tmp != "number" || tmp <= 0 || isNaN(tmp));
      if (typeof tmp == "number" && tmp > 0 && !isNaN(tmp)) {
        this.list[index].number = tmp;
      }
    },
    name(index) {
      let tmp = "";
      do {
        tmp = prompt("Ustaw nową nazwę");
      } while (tmp == null);
      if (tmp != null) {
        this.list[index].name = tmp;
      }
    },
    price(index) {
      let tmp = 0;
      do {
        tmp = parseFloat(prompt("Ustaw nową cenę"));
      } while (typeof tmp != "number" || tmp <= 0 || isNaN(tmp));
      if (typeof tmp == "number" && tmp > 0 && !isNaN(tmp)) {
        this.list[index].price = tmp;
      }
    },
    remove(index) {
      this.list.splice(index, 1);
    }
  },
  computed: {
    priceSum: {
      get() {
        if (this.list.length > 0) {
          let prices = this.list.map(x => x.price * x.number);
          return prices.reduce((a, b) => {
            return a + b;
          });
        } else {
          return 0;
        }
      }
    },
    pricePerUser: {
      get() {
        if (this.numOfParticipants != 0) {
          return this.priceSum / this.numOfParticipants;
        } else if (this.numOfParticipants === 0 || this.priceSum === 0) {
          return 0;
        }
      }
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

