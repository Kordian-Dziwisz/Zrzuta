<template>
  <div class="container">
    <div class="row border">
      <span class="col-lg-4 border-right align-self-center text-center">{{item.name}}</span>
      <span class="col-lg-2 border-right align-self-center text-center">x{{item.number}}</span>
      <span class="col-lg-3 border-right align-self-center text-right">{{item.price + " zł"}}</span>
      <span
        class="col-lg-3 align-self-center text-right"
      >{{item.price.toFixed(2) * item.number + " zł"}}</span>
    </div>
    <div class="row my-1">
      <div class="col-lg-3 my-1">
        <b-button size="sm" @click="name">Nazwa</b-button>
      </div>
      <div class="col-lg-3 my-1">
        <b-button size="sm" @click="number">Ilość</b-button>
      </div>
      <div class="col-lg-3 my-1">
        <b-button size="sm" @click="price">Cena</b-button>
      </div>
      <span class="col-lg-3 my-1">
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