<template>
  <div class="ListOfProducts">
    <form class="container" @submit.prevent="addItem" v-if="admin && !this.ended">
      <h3>Dodaj cel zbiórki</h3>
      <b-form-row>
        <b-col sm="6" lg="5" class="px-0 mr-1">
          <b-input type="text" placeholder="Nazwa" maxlength="30" v-model="newItem.name"/>
        </b-col>
        <b-col sm="6" lg="2" class="px-0">
          <b-input type="number" placeholder="Ilość" min="0" max="9999" v-model="newItem.number"/>
        </b-col>
        <b-col sm="6" lg="2" class="px-0 ml-1">
          <b-input
            type="number"
            placeholder="Cena"
            min="0"
            max="9999"
            step="0.01"
            v-model="newItem.price"
          />
        </b-col>
        <b-col>
          <b-button type="submit" class="btn btn-outline-success btn-light px-2">
            Dodaj
            <i class="fas fa-plus-square"></i>
          </b-button>
        </b-col>
      </b-form-row>
    </form>
    <div class="container mb-1">
      <span class="h5 d-block">Suma: {{priceSum + " zł"}}</span>
      <span class="h5 d-block">
        Na osobę: {{parseFloat(pricePerUser).toFixed(2) }}
        <span v-if="pricePerUser >= 0">zł</span>
      </span>
    </div>
    <ul class="container">
      <label class="h5" v-if="!admin && !this.ended">Cel zbiórki:</label>
      <label
        v-if="list.length==0 && !admin"
      >Lista produktów jest pusta, twórca zbiórki nie dodał jeszcze żadnego produktu.</label>
      <label v-if="list.length==0 && admin">Lista produktów jest pusta, dodaj nowy cel powyżej.</label>
      <table class="table table-light table-striped border">
        <thead>
          <tr>
            <th>
              <b-row>
                <b-col class="col-lg-3 align-self-center overflow-hidden text-center">Nazwa</b-col>
                <b-col class="col-lg-3 align-self-center overflow-hidden text-center">Ilość</b-col>
                <b-col class="col-lg-3 align-self-center overflow-hidden text-center">Cena</b-col>
                <b-col class="col-lg-3 align-self-center overflow-hidden text-center">Cena całkowita</b-col>
              </b-row>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="mb-1 border" v-for="(item, index) in list" :key="index">
            <td>
              <component
                :is="admin ? 'item-admin':'item'"
                :item="Object.assign(item, {index: index})"
                @number="number"
                @name="name"
                @price="price"
                @remove="remove"
              ></component>
            </td>
          </tr>
        </tbody>
      </table>
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
      handler() {
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