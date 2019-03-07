<template>
  <div class="container">
    <div class="row">
      <span class="col-lg-4 font-weight-bold">{{item.name}}</span>
      <span class="col-lg-4">
        <span class="font-weight-bold text-success" v-if="item.paid && !item.accepted">Wpłacono</span>
        <span class="font-weight-bold text-primary" v-if="item.accepted">Otrzymano</span>
      </span>
      <div class="col-lg-4 px-0">
        <b-button
          class="mt-1 btn-outline-primary btn-light"
          size="sm"
          v-if="!item.accepted"
          @click="accepted"
        >
          Zaakceptuj
          <i class="fas fa-vote-yea"></i>
        </b-button>
      </div>
    </div>
    <div class="row">
      <span class="col-lg-8 font-weight-light">{{item.comment}}</span>
      <span class="col-lg-3 px-0">
        <b-button class="my-2 btn-outline-danger btn-light" size="sm" @click="remove">
          Usuń
          <i class="fas fa-user-minus"></i>
        </b-button>
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
