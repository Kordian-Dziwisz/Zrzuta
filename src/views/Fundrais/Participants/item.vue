<template>
  <div class="ParticipantsListItem">
    <div class="row">
      <div class="col-lg-4">
        <strong>{{item.name}}</strong>
      </div>
      <div class="col-lg-4">
        <span class="text-success" v-if="item.paid && !item.accepted && authenticate">
          <strong>Zapłacono</strong>
        </span>
        <span class="text-primary" v-if="item.accepted">
          <strong>Otrzymano</strong>
        </span>
      </div>
      <div class="col-lg-4">
        <b-button
          class="btn-outline-primary btn-light"
          size="sm"
          v-if="authenticate && !item.paid && !item.accepted && ended"
          @click="paid"
        >
          Zapłaciłem
          <i class="fas fa-vote-yea"></i>
        </b-button>
      </div>
    </div>
    <div class="row container">
      <b-textarea class="col-lg-8" v-model.lazy.trim="item.comment" v-if="authenticate"></b-textarea>
      <span v-else>{{item.comment}}</span>
      <div class="col-lg-3">
        <b-button
          class="btn-outline-danger btn-light"
          size="sm"
          @click="remove"
          v-if="authenticate"
        >
          Usuń
          <i class="fas fa-user-minus"></i>
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
