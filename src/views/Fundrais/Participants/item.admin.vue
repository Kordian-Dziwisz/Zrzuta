<template>
  <div class="shadow-sm border rounded">
    <b-card-header
      class="shadow-sm py-1"
      :class="{'bg-success': item.paid, 'bg-primary': item.accepted, 'text-light': (item.paid || item.accepted)}"
    >
      <div class="row">
        <div class="col">
          <h5 class="d-lg-inline">{{item.name}}&nbsp;</h5>
          <h6 v-if="item.paid && !item.accepted">Wpłacono</h6>
          <h6 v-if="item.accepted">Otrzymano</h6>
        </div>
        <div class="col text-right">
          <b-button
            class="btn-outline-primary btn-light"
            size="sm"
            v-if="!item.accepted && ended"
            @click="accept"
          >
            <i class="fas fa-vote-yea"></i>
            <span class="d-none d-lg-inline">Zaakceptuj</span>
          </b-button>
          <b-button class="btn-outline-danger btn-light ml-1" size="sm" @click="remove">
            <i class="fas fa-user-minus"></i>
            <span class="d-none d-lg-inline">Usuń</span>
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body v-if="item.comment.length>0 || authenticate" class="py-3">
      <h6 v-if="authenticate">Twój komentarz:
        <b-form-textarea
          rows="0"
          max-rows="6"
          v-model.lazy.trim="item.comment"
          placeholder="Tutaj wpisz swój komentarz"
        ></b-form-textarea>
      </h6>
      <h6 v-else>{{item.comment}}</h6>
    </b-card-body>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    ended: false
  },
  methods: {
    accept() {
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
<style scoped>
h6 {
  white-space: pre-line;
  font-weight: 400;
}
</style>

