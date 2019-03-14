<template>
  <div class="shadow-sm border">
    <b-card-header class="shadow-sm py-1" :style="{'background-color': headerColor}">
      <div class="row">
        <div class="col">
          <h5 class="d-inline">{{item.name}}&nbsp;</h5>
          <span>
            <span v-if="item.paid && !item.accepted">Wpłacono</span>
            <span v-if="item.accepted">Otrzymano</span>
          </span>
        </div>
        <div class="col text-right"></div>
        <div>
          <b-button
            class="btn-outline-primary btn-light"
            size="sm"
            v-if="!item.accepted && ended"
            @click="accept"
          >
            <i class="fas fa-vote-yea"></i>
            Zaakceptuj
          </b-button>
          <b-button class="btn-outline-danger btn-light ml-1" size="sm" @click="remove">
            <i class="fas fa-user-minus"></i>
            Usuń
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body v-if="item.comment.length>0 || authenticate" class="py-3">
      <div v-if="authenticate">Twój komentarz:
        <b-form-textarea
          rows="0"
          max-rows="6"
          v-model.lazy.trim="item.comment"
          placeholder="Tutaj wpisz swój komentarz"
        ></b-form-textarea>
      </div>
      <div v-else>{{item.comment}}</div>
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
    },
    headerColor() {
      if (this.item.accepted) {
        return "#3399ff";
      } else if (this.item.paid) {
        return "#4dff4d";
      }
    }
  }
};
</script>
