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
    <b-card-body>
      <b-row>
        <b-col>
          <h3 class="float-left">Cele zbiórki</h3>
          <h4 class="float-right text-right">
            {{priceSum.toFixed(2).toString().replace(/[.]/, ',')}}
            <span v-if="pricePerUser >= 0">zł</span>
            <div
              class="text-right small"
              v-if="numOfParticipants > 1"
            >Na osobę: {{parseFloat(pricePerUser).toFixed(2).toString().replace(/[.]/, ',') }} zł</div>
          </h4>
        </b-col>
      </b-row>
      <form @submit.prevent="addNew" v-if="!this.ended">
        <label>Dodaj nową propozycję</label>
        <b-form-row>
          <div class="col-lg-5">
            <b-input
              type="text"
              name="name"
              placeholder="Nazwa"
              maxlength="50"
              v-model="newItem.name"
            />
          </div>
          <div class="col-lg-2">
            <b-input
              type="number"
              name="quantity"
              maxlength="4"
              v-model="newItem.number"
              min="0"
              max="9999"
              placeholder="Ilość"
              onfocus="this.value=''"
            />
          </div>
          <div class="col-lg-2">
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
          <div class="col-lg-3">
            <b-button type="submit" class="btn-outline-success btn-light">
              <i class="fas fa-plus-square" fa-fw></i>
              Dodaj
            </b-button>
          </div>
        </b-form-row>
      </form>
      <div class="my-2"></div>
      <h3 v-if="list.length==0">Nie zgłoszono żadnych propozycji</h3>
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
            <!-- <td>{{item.creator}}</td> -->
            <!-- :class="{'text-light': item.accepted, 'text-light': item.likes.length > numOfParticipants / 2}"
            :variant="{'success text-light': item.accepted, 'primary text-light': item.likes.length > numOfParticipants / 2}"-->
            <td
              :class="{'votedBar': item.likes.length > numOfParticipants / 2, 'acceptedBar': item.accepted}"
            >{{item.name}}</td>
            <td>{{item.number}} szt</td>
            <td>{{item.price.toString().replace(/[.]/, ',')}} zł</td>
            <td>{{(item.number * item.price).toFixed(2).toString().replace(/[.]/, ',')}} zł</td>
            <td v-if="isAdmin || authenticate(index)" class="text-right">
              <b-button
                class="btn"
                size="sm"
                :class="{'btn-info': liked(index), 'btn-outline-info btn-light': !liked(index)}"
                @click="like(index)"
              >
                <i class="fas fa-thumbs-up"></i>
                <span class="ml-1">{{item.likes.length}}</span>
              </b-button>
              <b-button
                size="sm"
                class="btn-outline-success btn-light"
                v-if="isAdmin && !item.accepted"
                @click="accept(index)"
              >
                <i class="fas fa-check fa-fw"></i>
                <span class="d-none">Akceptuj</span>
              </b-button>
              <b-button
                size="sm"
                class="btn-outline-danger btn-light"
                v-if="authenticate(index) || isAdmin"
                @click="remove(index)"
              >
                <i class="fas fa-trash-alt fa-fw"></i>
                <span class="d-none">Usuń</span>
              </b-button>
              <!-- <b-dropdown text="akcje" size="sm"></b-dropdown> -->
            </td>
            <td v-else>-</td>
          </tr>
        </tbody>
      </table>
    </b-card-body>
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
      if (this.list[index].likes.includes(localStorage.getItem("login"))) {
        this.list[index].likes.splice(this.list[index].likes.indexOf(localStorage.getItem("login"), 1));
      } else {
        this.list[index].likes.push(localStorage.getItem("login"));
      }
      this.$emit("list", this.list);
    },
    accept(index) {
      this.list[index].accepted = true;
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


