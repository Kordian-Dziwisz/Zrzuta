<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <strong>{{item.name}}</strong>
      </div>
      <div class="col-lg-4">
        <span class="text-success" v-if="item.paid && !item.accepted">
          <strong>Wpłacono</strong>
        </span>
        <span class="text-primary" v-if="item.accepted">
          <strong>Otrzymano</strong>
        </span>
      </div>
      <div class="col-lg-3">
        <b-button
          class="mt-1 btn-outline-primary btn-light"
          size="sm"
          v-if="!item.accepted && ended"
          @click="accepted"
        >
          <i class="fas fa-vote-yea fa-fw"></i>
          Zaakceptuj
        </b-button>
      </div>
    </div>
    <div class="row-sm-4">
      <b-textarea class="col-lg-9" v-model.lazy.trim="item.comment" v-if="authenticate"></b-textarea>
      <div class="col-lg-8 font-weight-light" v-else>{{item.comment}}</div>
      <div class="row-lg-4">
        <b-button class="btn-outline-danger btn-light" size="sm" @click="remove">
          <i class="fas fa-user-minus fa-fw"></i>
          Usuń
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    ended: false
  },
  methods: {
    accepted() {
      this.item.accepted = true;
    },
    remove() {
      this.$emit("remove", this.item.index);
    }
  },
  computed: {
    authenticate() {
      return this.item.name == localStorage.getItem("login");
    }
  }
};
</script>
