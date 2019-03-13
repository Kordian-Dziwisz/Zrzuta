<template>
  <div class="ListOfProducts">
    <form class="container" @submit.prevent="addItem" v-if="admin && !this.ended">
      <h3>Dodaj cel zbiórki</h3>
      <b-form-row>
        <div class="col-lg-5">
          <b-input type="text" placeholder="Nazwa" maxlength="30" v-model="newItem.name"/>
        </div>
        <div class="col-lg-2">
          <b-input type="number" placeholder="Ilość" min="0" max="99999" v-model="newItem.number"/>
        </div>
        <div class="col-lg-2">
          <b-input
            type="number"
            placeholder="Cena"
            min="0"
            max="99999"
            step="0.01"
            v-model="newItem.price"
          />
        </div>
        <div class="col-lg-3">
          <b-button type="submit" class="btn btn-outline-success btn-light">
             <i class="fas fa-plus-square fa-fw"></i>
             Dodaj
          </b-button>
        </div>
      </b-form-row>
    </form>
    <div class="container mb-1">
      <div class="h5">
        Suma: {{priceSum.toFixed(2)}}
        <span v-if="pricePerUser >= 0">zł</span>
      </div>
      <div class="h5">
        Na osobę: {{parseFloat(pricePerUser).toFixed(2) }}
        <span v-if="pricePerUser >= 0">zł</span>
      </div>
    </div>
    <ul>
      <h5 v-if="!admin && !this.ended">Cele zbiórki:</h5>
      <label
        v-if="list.length==0 && !admin"
      >Lista produktów jest pusta, twórca zbiórki nie dodał jeszcze żadnego produktu.</label>
      <label v-if="list.length==0 && admin">Lista produktów jest pusta, dodaj nowy cel powyżej.</label>
      <table v-else class="table table-striped">
        <thead>
          <th>Nazwa</th>
          <th>Ilość</th>
          <th>Cena</th>
          <th>Cena całkowita</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td id="white-space">{{item.name}}</td>
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
        <b-button class="btn-outline-primary btn-light" @click="save">Zapisz</b-button>&nbsp;
        <b-button class="btn-outline-primary btn-light" @click="modalShow = !modalShow">Anuluj</b-button>&nbsp;
        <b-button class="btn-outline-danger btn-light" @click="remove(editObject.index)">
          <i class="fas fa-trash-alt"></i>
          Usuń
        </b-button>
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
  padding: 0 1rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
table {
  white-space: nowrap;
}
#white-space {
  white-space: normal;
}
</style>