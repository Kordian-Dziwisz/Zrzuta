<template>
  <div v-if="!this.ended">
    <div class="container">
      <h3>Dodaj nową propozycję</h3>
      <form @submit.prevent="addNew">
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
              Dodaj
              <i class="fas fa-plus-square"></i>
            </b-button>
          </div>
        </b-form-row>
      </form>
    </div>
    <h3 v-if="list.length==0">Nie zgłoszono żadnych propozycji</h3>
    <table v-else class="table table-light table-striped">
      <thead>
        <th>Proponuje</th>
        <th>Nazwa</th>
        <th>Ilość</th>
        <th>Cena</th>
        <th>Poparcie</th>
      </thead>
      <tbody v-for="(item, index) in list" :key="index">
        <tr>
          <td>{{item.creator}}</td>
          <td class="white-normal">{{item.name}}</td>
          <td class="word-break">{{item.number}}</td>
          <td>{{item.price}}</td>
          <td>
            {{item.likes.length}}&nbsp;
            <b-button
              :class="{'btn-info': liked(index), 'btn-outline-info btn-light': !liked(index)}"
              @click="like(index)"
            >
              like&nbsp;
              <i class="fas fa-thumbs-up"></i>
            </b-button>
          </td>
        </tr>
        <tr>
          <td>
            <b-button class="btn-danger" v-if="authenticate(index)" @click="remove(index)">Usuń</b-button>
          </td>
          <td>
            <b-button class="btn-success" v-if="admin" @click="accept(index)">Akceptuj</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { parse } from "@fortawesome/fontawesome-svg-core";

export default {
  props: {
    list: Array,
    admin: Boolean,
    ended: Boolean
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
      this.list.splice(index, 1);
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
.white-normal {
  white-space: normal;
}
.word-break {
  word-break: keep-all;
}
</style>


