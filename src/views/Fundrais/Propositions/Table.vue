<template>
  <b-card class="border rounded" no-body>
    <b-card-title class="p-2 mb-0 text-center text-lg-left">
      <div class="d-block d-lg-inline">
        <h4 class="d-lg-inline">Cele zbiórki</h4>
        <b-button
          v-if="!this.ended && canAdd"
          type="submit"
          class="btn-outline-success btn-light ml-2 mb-1"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Dodaj nową propozycję"
          size="sm"
          @click="addNew"
        >
          <i class="fas fa-plus fa-fw"></i>
          Dodaj
        </b-button>
      </div>
      <span class="float-lg-right text-lg-right" v-if="priceSum > 0 && numOfParticipants">
        Na osobę: {{parseFloat(pricePerUser).toFixed(2).toString().replace(/[.]/, ',') }} zł
        <div class="text-lg-right small" v-if="numOfParticipants > 1">
          {{priceSum.toFixed(2).toString().replace(/[.]/, ',')}}
          zł
        </div>
      </span>
    </b-card-title>
    <b-card-body>
      <b-alert
        v-if="list.length==0"
        :show="true"
        variant="warning"
        class="text-dark"
      >Nie zgłoszono żadnych propozycji</b-alert>
      <div
        class="table-responsive"
        v-else-if="list.some(item=>{return item.accepted}) || list.every(item=>{return !item.accepted}) || !ended"
      >
        <table class="table table-striped border mb-0">
          <thead>
            <th class="text-left">Nazwa</th>
            <th class="text-right">Ilość</th>
            <th class="text-right">Cena (zł)</th>
            <th class="text-right">Koszt (zł)</th>
            <th class="text-right"></th>
          </thead>
          <tbody>
            <tr
              :class="{'votedBar': item.likes.length > numOfParticipants / 2, 'acceptedBar': item.accepted}"
              class="text-center"
              v-for="(item, index) in sortedList"
              :key="index"
            >
              <template
                v-if=" list.every(itemm=>{return !itemm.accepted}) || item.accepted == true || !ended"
              >
                <td class="text-left">{{item.name}}</td>
                <td class="text-right">{{item.number}}</td>
                <td class="text-right">{{item.price.toString().replace(/[.]/, ',')}}</td>
                <td
                  class="text-right"
                >{{(item.number * item.price).toFixed(2).toString().replace(/[.]/, ',')}}</td>
                <td class="text-right">
                  <b-button
                    class="mr-1 d-block d-lg-inline"
                    size="sm"
                    data-toggle="tooltip"
                    data-placement="auto"
                    v-b-tooltip.hover
                    title="Zagłosuj"
                    variant="primary"
                    :class="{'btn-primary': isLiked(index), 'btn-outline-primary btn-light': !isLiked(index)}"
                    @click="like(index)"
                  >
                    <i class="fas fa-thumbs-up fa-fw"></i>
                    <span class="ml-1">{{item.likes.length}}</span>
                  </b-button>
                  <b-dropdown
                    split
                    text="Edytuj"
                    size="sm"
                    v-if="isAuthenticated(index) || isAdmin"
                    @click="edit(index)"
                  >
                    <b-dropdown-item-button
                      size
                      :class="{'btn-outline-success btn-light': !item.accepted, 'btn-success': item.accepted}"
                      text="Zatwierdź"
                      class="text-success"
                      v-if="isAdmin && !item.accepted"
                      @click="accept(index)"
                    >
                      <i class="fas fa-check fa-fw"></i>
                      <span>Akceptuj</span>
                    </b-dropdown-item-button>
                    <b-dropdown-item-button
                      size="sm"
                      title="Usuń"
                      class="btn-outline-danger btn-light text-danger"
                      v-if="isAuthenticated(index) || isAdmin"
                      @click="remove(index)"
                    >
                      <i class="fas fa-trash-alt fa-fw"></i>
                      <span>Usuń</span>
                    </b-dropdown-item-button>
                  </b-dropdown>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card-body>

    <b-modal id @hide="editShow = false" :lazy="true" :title="editModalTitle" v-model="editShow">
      <form v-if="editObject" @submit.prevent="editSave">
        <b-form-row>
          <div class="col">
            <label for="editNameInput">Nazwa:</label>
            <b-form-input
              id="editNameInput"
              class="mb-1"
              type="text"
              name="name"
              v-model.trim="editObject.name"
              required
              placeholder="Wpisz nazwę"
              maxlength="30"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationName">Wpisz nazwę produktu (max. 50 znaków)</b-form-invalid-feedback>
          </div>
        </b-form-row>
        <b-form-row>
          <div class="col">
            <label for="editNumberInput">Ilość:</label>
            <b-form-input
              id="editNumberInput"
              type="number"
              name="quantity"
              v-model="editObject.number"
              required
              placeholder="Wpisz ilość"
              step="1"
              min="0"
              class="text-right"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationNumber">Ilość musi być większa niż 0</b-form-invalid-feedback>
          </div>
          <div class="col">
            <label for="editPriceInput">Cena:</label>
            <b-input
              class="text-right"
              id="editPriceInput"
              type="text"
              name="price"
              v-model="editObject.price"
              placeholder="Wpisz cenę"
              step="0.01"
              min="0"
            ></b-input>
            <b-form-invalid-feedback
              :state="validationPrice"
            >Cena produktu musi być większa niż 0 zł</b-form-invalid-feedback>
          </div>
        </b-form-row>
      </form>
      <div slot="modal-footer" class="w-100">
        <b-button class="float-right ml-1" variant="outline-success light" @click="editSave">Zapisz</b-button>
        <b-button
          class="float-right"
          variant="outline-secondary light"
          @click="editShow = false"
        >Anuluj</b-button>
      </div>
    </b-modal>
    <b-modal
      v-model="removeShow"
      id
      @hide="removeShow = false"
      :lazy="true"
      header-bg-variant="danger"
      header-text-variant="light"
      title="Potwierdzenie usunięcia"
    >
      <div class="container fluid">
        <div class="row text-center">
          <strong
            class="h4"
          >Czy jesteś pewny, że chcesz usunąć propozycję? Ten proces jest nieodwracalny! Nawet administrator tego nie naprawi!</strong>
        </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <b-button class="float-right ml-1" variant="outline-danger light" @click="remove()">
          <i class="fas fa-trash-alt fa-fw"></i>Usuń
        </b-button>
        <b-button
          class="float-right"
          variant="outline-secondary light"
          @click="removeShow = false"
        >Anuluj</b-button>
      </div>
    </b-modal>
  </b-card>
</template>
<script>
import { parse } from "@fortawesome/fontawesome-svg-core";
import { required, minLenght, between, maxLength, integer, numeric } from "vuelidate/lib/validators";

export default {
  props: {
    list: Array,
    isAdmin: Boolean,
    ended: Boolean,
    numOfParticipants: Number,
    canAdd: Boolean
  },
  data() {
    return {
      removeShow: false,
      removeIndex: 0,
      editObject: undefined,
      editShow: false,
      editIndex: undefined,
      editModalTitle: "Edytuj produkt"
    };
  },
  methods: {
    addNew() {
      //   this.list.push({
      //     creator: localStorage.getItem("login"),
      //     name: editObject.name,
      //     number: editObject.number,
      //     price: editObject.price,
      //     accepted: false,
      //     likes: [],
      //     dislikes: []
      //   });
      this.edit(null);
      //   this.edit(this.list.length - 1);
    },
    edit(index) {
      if (index === null) {
        this.editModalTitle = "Nowy produkt";
        this.editIndex = null;
        this.editObject = {
          creator: localStorage.getItem("login"),
          name: "",
          number: null,
          price: "",
          accepted: false,
          likes: [],
          dislikes: []
        };
        this.editShow = true;
      } else {
        this.editIndex = index;
        this.editObject = { ...this.list[index] };
        this.editShow = true;
        this.editModalTitle = "Edytuj produkt";
      }
    },
    editSave() {
      if (this.validationName && this.validationNumber && this.validationPrice) {
        //   w wypadku kiedy tworzysz nowy obiekt
        if (this.editIndex === null) {
          this.editObject.price = parseFloat(this.editObject.price.replace(",", /[.]/)).toFixed(2);
          this.list.push({ ...this.editObject });
          this.$emit("list", this.list);
          this.editShow = false;
        } else {
          this.editShow = false;
          this.list[this.editIndex].name = this.editObject.name;
          this.list[this.editIndex].number = parseInt(this.editObject.number);
          this.list[this.editIndex].price = parseFloat(this.editObject.price.replace(",", /[.]/)).toFixed(2);
          this.editIndex = null;
          this.$emit("list", this.list);
        }
      }
    },
    remove(index) {
      if (this.removeShow) {
        this.list.splice(this.removeIndex, 1);
        this.removeShow = false;
      } else {
        this.removeShow = true;
        this.removeIndex = index;
      }
      this.$emit("list", this.list);
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
    isLiked(index) {
      return this.list[index].likes.includes(localStorage.getItem("login"));
    },
    isAuthenticated(index) {
      return this.list[index].creator == localStorage.getItem("login");
    }
  },
  computed: {
    sortedList() {
      return this.list.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
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
    },
    validationName: {
      get() {
        return this.editObject.name.length > 0;
      }
    },
    validationNumber: {
      get() {
        return this.editObject.number > 0 && this.editObject.number % 1 == 0;
      }
    },
    validationPrice: {
      get() {
        return (
          this.editObject.price.length > 0 && parseFloat(this.editObject.price.replace(",", /[.]/)).toFixed(2) > 0.01
        );
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
  box-shadow: inset 6px 0px 0px 0px #28a745 !important;
}
.votedBar {
  box-shadow: inset 6px 0px 0px 0px #007bff !important;
}
</style>


