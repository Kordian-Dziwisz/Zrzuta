<template>
  <div class="ParticipantsListItem">
    <div class="row mr-0">
      <span class="col-lg-4 font-weight-bold">{{item.name}}</span>
      <span class="col-lg-4">
        <span
          class="font-weight-bold text-success"
          v-if="item.paid && !item.accepted && authenticate"
        >Zapłacono</span>
        <span class="font-weight-bold text-primary" v-if="item.accepted">Otrzymano</span>
      </span>
      <div class="col-lg-4 pl-3 pr-0">
        <b-button
          class="mt-1 btn-outline-primary btn-light"
          size="sm"
          v-if="authenticate && !item.paid && !item.accepted"
          @click="paid"
        >
          Zapłaciłem
          <i class="fas fa-vote-yea"></i>
        </b-button>
      </div>
    </div>
    <div class="row container m-0 pr-1">
      <b-textarea class="col-lg-8 mt-1 mb-1" v-model="item.comment" v-if="authenticate"></b-textarea>
      <span v-else>{{item.comment}}</span>
      <span class="col-lg-3 pl-2 pr-0">
        <b-button
          class="my-2 btn-outline-danger btn-light"
          size="sm"
          @click="remove"
          v-if="authenticate"
        >
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
