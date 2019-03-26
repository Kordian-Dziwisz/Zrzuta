<template>
  <div class="container-fluid w-75">
    <div class="font-weight-light">
      <span class="h2">Lista zbiórek</span>
      <b-button variant="outline-success" class="float-right" @click="showModal=true">
        <i class="fas fa-plus fa-fw"></i>Nowa zbiórka
      </b-button>
    </div>
    <b-alert
      variant="warning"
      :show="list.length === 0"
    >Brak aktywnych zbiórek - utwórz nową lub poproś o zaproszenie do obecnej.</b-alert>
    <ul class="list-group" v-for="(item, index) in list" :key="index">
      <Item class="list-group-item" :item="{index: index, ...item}" @remove="remove"/>
    </ul>
    <!-- new fundrais modal -->
    <b-modal
      id
      @hide="showModal = false"
      :hide-header-close="true"
      :lazy="true"
      title="Dodaj nową zbiórkę"
      v-model="showModal"
    >
      <form @submit.prevent="addNew()">
        <b-form-row>
          <label for="newFundraisTitle">Tytuł:</label>
          <b-form-input
            id="editCommentInput"
            class="mb-1"
            type="text"
            name="name"
            v-model.trim="title"
            required
            minlength="3"
            invalid-feedback
            placeholder="Wpisz tytuł"
          ></b-form-input>
          <b-form-invalid-feedback :state="title.length>2">Tytuł musi mieć minimum 3 znaki</b-form-invalid-feedback>
          <label for="newFundraisDescription">Opis:</label>
          <b-form-textarea
            id="editCommentInput"
            class="mb-1"
            type="text"
            name="name"
            v-model.trim="description"
            max-rows="6"
            placeholder="Opcjonalnie wpisz komentarz"
          ></b-form-textarea>
        </b-form-row>
      </form>
      <div slot="modal-footer" class="w-100">
        <b-button class="float-right ml-1" variant="outline-success light" @click="addNew()">Zapisz</b-button>
        <b-button
          class="float-right"
          variant="outline-secondary light"
          @click="showModal = false"
        >Anuluj</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Item from "@/views/Home/item.vue";
export default {
  props: {
    list: Array
  },
  data() {
    return {
      newName: "",
      title: "",
      description: "",
      showModal: false
    };
  },
  methods: {
    remove(event) {
      this.list.splice(event.index, 1);
      this.$emit("remove", event.id);
    },
    addNew() {
      let obj = new Object();
      obj.title = this.title;
      obj.description = this.description;
      if (this.title.length > 2) {
        this.$emit("new", obj);
      }
    }
  },
  components: {
    Item
  }
};
</script>
