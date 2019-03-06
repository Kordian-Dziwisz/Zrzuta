<template>
  <div class="ParticipantsListItem">
    <div class="row">
      <span class="col-lg-4 font-weight-bold">{{item.name}}</span>
      <span class="col-lg-4">
        <span
          class="font-weight-bold text-success"
          v-if="item.paid && !item.accepted && authenticate"
        >Zapłacono</span>
        <span class="font-weight-bold text-primary" v-if="item.accepted">Otrzymano</span>
      </span>
      <div class="col-lg-2">
        <b-button
          class="mt-1 btn-outline-info btn-light"
          size="sm"
          v-if="authenticate && !item.paid && !item.accepted"
          @click="paid"
        >Zapłaciłem</b-button>
      </div>
    </div>
    <div class="row container">
      <b-textarea class="col-lg-9 mt-1 mb-1" v-model="item.comment" v-if="authenticate"></b-textarea>
      <span v-else>{{item.comment}}</span>
      <span class="col-lg-3">
        <b-button
          class="my-2 mt-2 btn-outline-danger btn-light"
          size="sm"
          @click="remove"
          v-if="authenticate"
        >Usuń</b-button>
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
    paid() {
      if (this.item.accepted == false) {
        this.item.paid = true;
      }
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
