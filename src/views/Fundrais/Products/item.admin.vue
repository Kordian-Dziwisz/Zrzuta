<template>
  <div class="container">
    <div class="row">
      <span class="col-lg-auto">
        {{item.name}}
        <span v-if="item.number > 1">x{{item.number}}</span>
      </span>
      <span class="col-lg-3">{{item.price + " zł"}}</span>
    </div>
    <div class="row my-1">
      <div class="col-lg-3">
        <b-button size="sm" @click="name">Nazwa</b-button>
      </div>
      <div class="col-lg-3">
        <b-button size="sm" @click="number">Ilość</b-button>
      </div>
      <div class="col-lg-3">
        <b-button size="sm" @click="price">Cena</b-button>
      </div>
      <span class="col-lg-3">
        <b-button class="btn-outline-danger btn-light" size="sm" @click="remove">Usuń</b-button>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    number() {
      this.$emit("number", this.item.index);
    },
    name() {
      this.$emit("name", this.item.index);
    },
    price() {
      this.$emit("price", this.item.index);
    },
    remove() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>