<template>
  <div class="border rounded">
    <b-card-header class="py-1" :class="{'paidBar': item.paid, 'acceptedBar': item.accepted}">
      <div class="row">
        <div class="col">
          <h5 class="d-lg-inline">{{item.name}}</h5>
          <h6 v-if="item.paid && !item.accepted">Wpłacono</h6>
          <h6 v-if="item.accepted">Otrzymano</h6>
        </div>
        <div class="col text-right">
          <b-button
            class="btn-outline-danger btn-light ml-1"
            size="sm"
            data-toggle="tooltip"
            data-placement="auto"
            v-b-tooltip.hover
            title="Usuń"
            @click="remove"
            v-if="authenticate"
          >
            <i class="fas fa-user-minus"></i>
            <span class="d-none d-lg-inline">Usuń</span>
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="py-3" v-if="item.comment.length>0 || authenticate">
      <h6 v-if="authenticate">Twój komentarz:
        <b-form-textarea
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
.acceptedBar {
  border-left: 6px solid #28a745 !important;
  box-sizing: border-box;
}
.paidBar {
  border-left: 6px solid #007bff;
  box-sizing: border-box;
}
</style>

