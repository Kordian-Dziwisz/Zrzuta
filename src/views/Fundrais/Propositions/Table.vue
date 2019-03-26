<template>
  <b-card class="border rounded" no-body>
    <!-- <b-card-header class="w-100"> -->
    <!-- <div class="float-right text-success">Otwarte</div> -->
    <!-- <b-row> -->
    <!--  -->
    <!-- <b-col class="h4">Cele zbiórki</b-col> -->
    <!-- <b-col class="text-right text-success">Otwarte</b-col> -->
    <!-- </b-row> -->
    <!-- </b-card-header> -->
    <b-card-title class="p-2 mb-0">
      <h3>
        <div class="d-inline">
          <span>Cele zbiórki</span>
          <b-button
            v-if="!this.ended"
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
        <span class="float-right text-right" v-if="priceSum > 0 && numOfParticipants">
          Na osobę: {{parseFloat(pricePerUser).toFixed(2).toString().replace(/[.]/, ',') }} zł
          <div class="text-right small" v-if="numOfParticipants > 1">
            {{priceSum.toFixed(2).toString().replace(/[.]/, ',')}}
            zł
          </div>
        </span>
      </h3>
    </b-card-title>
    <b-card-body>
      <b-alert
        v-if="list.length==0"
        :show="true"
        variant="warning"
        class="text-dark"
      >Nie zgłoszono żadnych propozycji</b-alert>
      <table v-else class="table table-striped border mb-0">
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
            v-for="(item, index) in list"
            :key="index"
          >
            <template v-if="item.accepted == true || !ended">
              <td class="text-left">{{item.name}}</td>
              <td class="text-right">{{item.number}}</td>
              <td class="text-right">{{item.price.toString().replace(/[.]/, ',')}}</td>
              <td
                class="text-right"
              >{{(item.number * item.price).toFixed(2).toString().replace(/[.]/, ',')}}</td>
              <!-- <b-button
                class="btn"
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
                class="m-1"
                size="sm"
                data-toggle="tooltip"
                data-placement="auto"
                v-b-tooltip.hover
                title="Edytuj"
                v-if="isAuthenticated(index) || isAdmin"
                @click="edit(index)"
              >
                <b-dropdown-item-button
                  size
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
                </b-dropdown-item-button>
                <b-dropdown-item-button
                  size="sm"
                  title="Usuń"
                  class="btn-outline-danger btn-light"
                  v-if="isAuthenticated(index) || isAdmin"
                  @click="remove(index)"
                >
                  <i class="fas fa-trash-alt fa-fw"></i>
                  <span class="d-none">Usuń</span>
                </b-dropdown-item-button>
              </b-dropdown>-->
              <td class="text-right">
                <b-button-group v-if="!ended">
                  <b-button
                    class="btn"
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
                    v-if="isAuthenticated(index) || isAdmin"
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
                    v-if="isAuthenticated(index) || isAdmin"
                    @click="edit(index)"
                  >
                    <i class="fas fa-edit fa-fw"></i>
                    <span class="d-none">Edytuj</span>
                  </b-button>
                </b-button-group>
                <!-- <b-dropdown text="akcje" size="sm"></b-dropdown> -->
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </b-card-body>
    <b-modal id @hide="editShow = false" :lazy="true" :title="editModalTitle" v-model="editShow">
      <form v-if="editObject" @submit.prevent="editSave">
        <b-form-row>
          <label for="editNameInput">Nazwa:</label>
          <b-form-input
            id="editNameInput"
            class="mb-1"
            type="text"
            name="name"
            v-model.trim="editObject.name"
            required
            placeholder="Wpisz nazwę"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationName">Nazwa produktu nie może być pusta</b-form-invalid-feedback>
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
              class="float-right text-right"
              id="editPriceInput"
              type="number"
              name="price"
              v-model="editObject.price"
              placeholder="Wpisz cenę"
              step="0.01"
              min="0"
            ></b-input>
          </div>
          <b-form-invalid-feedback :state="validationPrice">Cena produktu musi być większa niż 0 zł</b-form-invalid-feedback>
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
      size="lg"
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
    numOfParticipants: Number
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
          price: null,
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
          this.list.push({ ...this.editObject });
          console.log(this.editObject);
          this.$emit("list", this.list);
          this.editShow = false;
        } else {
          this.editShow = false;

          this.list[this.editIndex].name = this.editObject.name;
          this.list[this.editIndex].number = parseInt(this.editObject.number);
          this.list[this.editIndex].price = parseFloat(this.editObject.price).toFixed(2);
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
  //   validations: {
  //     editInfo: {
  //       name: {
  //         required: required(),
  //         minLength: minLenght(4),
  //         maxLength: maxLength(80)
  //       },
  //       number: {
  //         between: between(20, 30),
  //         integer: integer()
  //       },
  //       price: {
  //         between: between(20, 30),
  //         numeric: numeric()
  //       }
  //     }
  //   },
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
        return this.editObject.price > 0;
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


