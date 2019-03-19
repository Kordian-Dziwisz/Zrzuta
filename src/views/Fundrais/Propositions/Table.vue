<template>
  <b-card class="border rounded">
    <!-- <b-card-header class="w-100 shadow-sm"> -->
    <!-- <div class="float-right text-success">Otwarte</div> -->
    <!-- <b-row> -->
    <!--  -->
    <!-- <b-col class="h4">Cele zbiórki</b-col> -->
    <!-- <b-col class="text-right text-success">Otwarte</b-col> -->
    <!-- </b-row> -->
    <!-- </b-card-header> -->
    <b-card-title>
      <h3>
        <span>Cele zbiórki</span>
        <span class="float-right text-right" v-if="priceSum > 0 && numOfParticipants">
          {{priceSum.toFixed(2).toString().replace(/[.]/, ',')}}
          zł
          <div
            class="text-right small"
            v-if="numOfParticipants > 1"
          >Na osobę: {{parseFloat(pricePerUser).toFixed(2).toString().replace(/[.]/, ',') }} zł</div>
        </span>
      </h3>
    </b-card-title>
    <b-card-body>
      <form @submit.prevent="addNew" v-if="!this.ended">
        <label>Dodaj nową propozycję</label>
        <div class="form-row">
          <div class="col">
            <b-input
              type="text"
              name="name"
              placeholder="Nazwa"
              minlenght="3"
              maxlength="50"
              v-model="newItem.name"
            />
          </div>
          <div class="col">
            <b-input
              type="number"
              name="quantity"
              v-model="newItem.number"
              min="0"
              max="9999"
              placeholder="Ilość"
            />
          </div>
          <div class="col">
            <b-input
              type="number"
              name="price"
              v-model="newItem.price"
              step="0.01"
              min="0"
              max="9999"
              placeholder="Cena"
            />
          </div>
          <div class="col">
            <b-button
              type="submit"
              class="btn-outline-success btn-light"
              data-toggle="tooltip"
              data-placement="auto"
              v-b-tooltip.hover
              title="Dodaj"
            >
              <i class="fas fa-plus-square"></i>
              Dodaj
            </b-button>
          </div>
        </div>
      </form>
      <b-alert
        v-if="list.length==0"
        :show="true"
        variant="warning"
        class="text-dark"
      >Nie zgłoszono żadnych propozycji</b-alert>
      <table v-else class="table table-striped border">
        <thead class="text-center">
          <th>Nazwa</th>
          <th>Ilość</th>
          <th>Cena</th>
          <th>Koszt</th>
          <th></th>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in list" :key="index">
            <td
              :class="{'votedBar': item.likes.length > numOfParticipants / 2, 'acceptedBar': item.accepted}"
            >{{item.name}}</td>
            <td>{{item.number}} szt</td>
            <td>{{item.price.toString().replace(/[.]/, ',')}} zł</td>
            <td>{{(item.number * item.price).toFixed(2).toString().replace(/[.]/, ',')}} zł</td>
            <td v-if="isAdmin || authenticate(index)" class="text-right">
              <b-button-group>
                <b-button
                  class="btn"
                  size="sm"
                  data-toggle="tooltip"
                  data-placement="auto"
                  v-b-tooltip.hover
                  title="Polub"
                  variant="primary"
                  :class="{'btn-primary': liked(index), 'btn-outline-primary btn-light': !liked(index)}"
                  @click="like(index)"
                >
                  <i class="fas fa-thumbs-up fa-fw"></i>
                  <span class="ml-1">{{item.likes.length}}</span>
                </b-button>
                <b-button
                  size="sm"
                  :class="{'btn-outline-success btn-light': !item.accepted, 'btn-success': item.accepted}"
                  data-toggle="tooltip"
                  data-placement="auto"
                  v-b-tooltip.hover
                  title="Zatwierdź"
                  v-if="isAdmin"
                  @click="accept(index)"
                >
                  <i class="fas fa-check fa-fw"></i>
                  <span class="d-none">Akceptuj</span>
                </b-button>
                <b-button
                  size="sm"
                  class="btn-outline-danger btn-light"
                  data-toggle="tooltip"
                  data-placement="auto"
                  v-b-tooltip.hover
                  title="Usuń"
                  v-if="authenticate(index) || isAdmin"
                  @click="remove(index)"
                >
                  <i class="fas fa-trash-alt fa-fw"></i>
                  <span class="d-none">Usuń</span>
                </b-button>
                <b-button
                  size="sm"
                  class="btn-outline-secondary btn-light"
                  data-toggle="tooltip"
                  data-placement="auto"
                  v-b-tooltip.hover
                  title="Edytuj"
                  v-if="authenticate(index) || isAdmin"
                  @click="edit(index)"
                >
                  <i class="fas fa-cogs fa-fw"></i>
                  <span class="d-none">Edytuj</span>
                </b-button>
              </b-button-group>
              <!-- <b-dropdown text="akcje" size="sm"></b-dropdown> -->
            </td>
            <td v-else>-</td>
          </tr>
        </tbody>
      </table>
    </b-card-body>
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
      <form class="float-right">
        <b-button class="btn-outline-success mx-1" variant="light" @click="editSave">Zapisz</b-button>
        <b-button
          class="btn-outline-secondary mx-1"
          variant="light"
          @click="modalShow = false"
        >Anuluj</b-button>
      </form>
    </b-modal>
  </b-card>
</template>
<script>
import { parse } from "@fortawesome/fontawesome-svg-core";

export default {
  props: {
    list: Array,
    isAdmin: Boolean,
    ended: Boolean,
    numOfParticipants: Number
  },
  data() {
    return {
      newItem: {
        creator: "",
        number: "",
        name: "",
        price: ""
      },
      editObject: undefined,
      modalShow: false,
      editIndex: undefined
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
    edit(index) {
      this.editIndex = index;
      this.editObject = { ...this.list[index] };
      this.modalShow = true;
      console.log("edit(index)");
    },
    editSave() {
      this.list[this.editIndex].name = this.editObject.name;
      this.list[this.editIndex].number = this.editObject.number;
      this.list[this.editIndex].price = this.editObject.price;
      this.modalShow = false;
    },
    remove(index) {
      this.list.splice(index, 1);
      this.showModal = false;
    },
    like(index) {
      if (this.list[index].likes.includes(localStorage.getItem("login"))) {
        this.list[index].likes.splice(this.list[index].likes.indexOf(localStorage.getItem("login"), 1));
      } else {
        this.list[index].likes.push(localStorage.getItem("login"));
      }
      this.$emit("list", this.list);
    },
    accept(index) {
      this.list[index].accepted = !this.list[index].accepted;
      this.$emit("list", this.list);
    },
    liked(index) {
      return this.list[index].likes.includes(localStorage.getItem("login"));
    },
    authenticate(index) {
      return this.list[index].creator == localStorage.getItem("login");
    }
  },
  created() {
    this.newItem.creator = localStorage.getItem("login");
  },
  computed: {
    priceSum: {
      get() {
        if (this.list.length > 0) {
          if (this.list.every(item => item.accepted == false)) {
            let prices = this.list.map(item => item.price * item.number);
            return prices.reduce((acc, item) => {
              return acc + item;
            });
          } else {
            let prices = this.list.filter(item => item.accepted == true).map(item => item.price * item.number);
            return prices.reduce((acc, item) => {
              return acc + item;
            });
          }
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
thead {
  word-break: keep-all;
  white-space: none;
}
.acceptedBar {
  border-left: 6px solid #28a745 !important;
  box-sizing: border-box;
}
.votedBar {
  border-left: 6px solid #007bff;
  box-sizing: border-box;
}
</style>


