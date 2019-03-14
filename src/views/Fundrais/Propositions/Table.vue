<template>
  <b-card-group class="shadow border rounded">
    <b-card-header class="w-100 shadow-sm">Cele zbiórki</b-card-header>
    <b-card-body>
      <form @submit.prevent="addNew" v-if="!this.ended">
        <h3>Dodaj nową propozycję</h3>
        <b-form-row>
          <div class="col-lg-5">
            <b-input
              type="text"
              name="name"
              placeholder="Nazwa"
              maxlength="30"
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
      <div class="my-2">
        <div class="h5">
          Suma: {{priceSum.toFixed(2)}}
          <span v-if="pricePerUser >= 0">zł</span>
        </div>
        <div class="h5">
          Na osobę: {{parseFloat(pricePerUser).toFixed(2) }}
          <span
            v-if="pricePerUser >= 0"
          >zł ({{numOfParticipants}} uczestników)</span>
        </div>
      </div>
      <h3 v-if="list.length==0">Nie zgłoszono żadnych propozycji</h3>
      <table v-else class="table table-striped border">
        <thead class="text-center">
          <th>Proponuje</th>
          <th>Nazwa</th>
          <th>Ilość</th>
          <th>Cena</th>
          <th>Koszt</th>
          <th>Poparcie</th>
          <th>Akcje</th>
        </thead>
        <tbody>
          <tr
            :class="{'bg-success text-light': item.accepted, 'bg-primary text-light': item.likes.length > numOfParticipants / 2}"
            class="text-center"
            v-for="(item, index) in list"
            :key="index"
          >
            <td>{{item.creator}}</td>
            <td>{{item.name}}</td>
            <td>{{item.number}} szt</td>
            <td>{{item.price}} zł</td>
            <td>{{item.number * item.price}} zł</td>
            <td>
              {{item.likes.length}}
              <b-button
                class="ml-1 btn"
                size="sm"
                :class="{'btn-info': liked(index), 'btn-outline-info btn-light': !liked(index)}"
                @click="like(index)"
              >
                <i class="fas fa-thumbs-up"></i>
                Like
              </b-button>
            </td>
            <td v-if="isAdmin || authenticate(index)">
              <b-button
                size="sm"
                class="btn-success"
                v-if="isAdmin && !item.accepted"
                @click="accept(index)"
              >
                <i class="fas fa-vote-yea pr-1"></i>
                <span class="d-none d-lg-inline">Akceptuj</span>
              </b-button>
              <b-button
                size="sm"
                class="ml-1 btn-danger"
                v-if="authenticate(index) || isAdmin"
                @click="remove(index)"
              >
                <i class="fas fa-trash-alt"></i>
                Usuń
              </b-button>
              <!-- <b-dropdown text="akcje" size="sm"></b-dropdown> -->
            </td>
            <td v-else>-</td>
          </tr>
        </tbody>
      </table>
    </b-card-body>
  </b-card-group>
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
</style>


