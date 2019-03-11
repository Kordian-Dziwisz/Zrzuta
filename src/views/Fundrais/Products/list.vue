<template>
  <div class="ListOfProducts">
    <form class="container" @submit.prevent="addItem" v-if="admin && !this.ended">
      <h3>Dodaj cel zbiórki</h3>
      <b-form-row>
        <b-col sm="6" lg="5" class="px-0 mr-1">
          <b-input type="text" placeholder="Nazwa" maxlength="30" v-model="newItem.name"/>
        </b-col>
        <b-col sm="6" lg="2" class="px-0">
          <b-input type="number" placeholder="Ilość" min="0" max="99999" v-model="newItem.number"/>
        </b-col>
        <b-col sm="6" lg="2" class="px-0 ml-1">
          <b-input
            type="number"
            placeholder="Cena"
            min="0"
            max="99999"
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
      <span class="h5 d-block">
        Suma: {{priceSum.toFixed(2)}}
        <span v-if="pricePerUser >= 0">zł</span>
      </span>
      <span class="h5 d-block">
        Na osobę: {{parseFloat(pricePerUser).toFixed(2) }}
        <span v-if="pricePerUser >= 0">zł</span>
      </span>
    </div>
    <ul class="container">
      <label class="h5" v-if="!admin && !this.ended">Cele zbiórki:</label>
      <label
        v-if="list.length==0 && !admin"
      >Lista produktów jest pusta, twórca zbiórki nie dodał jeszcze żadnego produktu.</label>
      <label v-if="list.length==0 && admin">Lista produktów jest pusta, dodaj nowy cel powyżej.</label>
      <table v-else class="table table-bordered table-striped">
        <thead>
          <th>Nazwa</th>
          <th>Ilość</th>
          <th>Cena</th>
          <th>Cena całkowita</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td style="white-space: normal">{{item.name}}</td>
            <td>{{item.number}}</td>
            <td>{{`${item.price}&nbsp;zł`}}</td>
            <td>{{`${(item.number * item.price).toFixed(2)}&nbsp;zł`}}</td>
            <td>
              <b-button
                class="btn-outline-danger btn-light"
                size="sm"
                @click="editProduct({...item, index: index})"
              >Edytuj</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal
        hide-footer
        title="Edytuj produkt"
        v-if="modalShow && editObject"
        v-model="modalShow"
        id
      >
        <div class="d-block text-center">
          <form>
            <b-form-row>
              <b-input
                class="mb-1"
                type="text"
                name="name"
                v-model.trim="editObject.name"
                required
                placeholder="Wpisz nową nazwę"
                maxlength="30"
              ></b-input>
              <b-input
                type="number"
                name="quantity"
                v-model="editObject.number"
                required
                placeholder="Wpisz nową ilość"
                max="9999"
                step="0.01"
                min="0"
              ></b-input>
              <b-input
                class="my-1"
                type="number"
                name="price"
                v-model="editObject.price"
                required
                placeholder="Wpisz nową cenę"
                max="9999"
                step="0.01"
                min="0"
              ></b-input>
            </b-form-row>
          </form>
        </div>
        <b-button class="btn btn-primary" @click="save">Zapisz</b-button>&nbsp;
        <b-button class="btn btn-primary" @click="modalShow = !modalShow">Anuluj</b-button>&nbsp;
        <b-button class="btn btn-danger" @click="remove(editObject.index)">Usuń</b-button>
      </b-modal>
    </ul>
  </div>
</template>
<script>
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
      },
      editObject: undefined,
      modalShow: false
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
    editProduct(product) {
      this.editObject = product;
      this.modalShow = true;
    },
    remove(index) {
      this.list.splice(index, 1);
      this.modalShow = !this.modalShow;
    },
    save() {
      this.list[this.editObject.index] = { ...this.editObject };
      delete this.list[this.editObject.index].index;
      this.modalShow = !this.modalShow;
      this.$emit("list", this.list);
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
table {
  white-space: nowrap;
}
</style>