<template>
  <div class="ParticipantsListItem">
    <div class="row">
      <span class="col-5">{{item.index + 1}}: {{item.name}}</span>
      <span class="col-5" v-if="item.paid && authenticate">Zapłacono</span>
      <span class="col-5" v-if="item.accepted && authenticate">Otrzymano</span>
      <span class="col-5 pl-0 ml-5">
        <b-button
          class="ml-5 mt-1 btn-outline-info btn-light"
          size="sm"
          v-if="authenticate && !item.paid"
          @click="setPaid"
        >Zapłaciłem</b-button>
      </span>
    </div>
    <div class="row container">
      <b-textarea class="col-8 mt-2 mb-1" v-model="item.comment" v-if="authenticate"></b-textarea>
      <span v-else>{{item.comment}}</span>
      <span class="col pl-0 ml-1">
        <b-button
          class="ml-4 mt-2 btn-outline-danger btn-light"
          size="sm"
          @click="removeItem"
          v-if="authenticate"
        >Usuń</b-button>
      </span>
    </div>
    <div class="control"></div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    setComment() {
      this.$emit("comment", this.item.index);
    },
    setPaid() {
      if (this.item.accepted == false) {
        this.$emit("paid", this.item.index);
      }
    },
    removeItem() {
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
