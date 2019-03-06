<template>
  <div class="container">
    <div class="row">
      <span class="col-lg-4">{{item.index + 1}}: {{item.name}}</span>
      <span class="col-lg-4">
        <span v-if="item.paid && !item.accepted">Wpłacono</span>
        <span v-if="item.accepted">Otrzymano</span>
      </span>
      <div class="col-lg-2">
        <b-button
          class="mt-1 btn-outline-info btn-light"
          size="sm"
          v-if="!item.accepted"
          @click="accepted"
        >Zaakceptuj</b-button>
      </div>
    </div>
    <div class="row">
      <span class="col-lg-8">{{item.comment}}</span>
      <span class="col-lg-3">
        <b-button class="my-2 btn-outline-danger btn-light" size="sm" @click="remove">Usuń</b-button>
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
    accepted() {
      this.item.accepted = true;
    },
    remove() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>
