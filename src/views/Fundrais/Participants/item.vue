<template>
  <div class="shadow-sm border rounded">
    <b-card-header
      class="shadow-sm py-1 text-white"
      :class="{'bg-success': item.paid, 'bg-primary': item.accepted}"
    >
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
            class="btn-outline-success btn-light"
            size="sm"
            v-if="authenticate && !item.paid && !item.accepted && ended"
            @click="pay"
          >
            <i class="fas fa-vote-yea"></i>
            Zapłaciłem/am
          </b-button>
          <b-button
            class="btn-outline-danger btn-light ml-1"
            size="sm"
            @click="remove"
            v-if="authenticate"
          >
            <i class="fas fa-user-minus"></i>
            Usuń
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="py-3" v-if="item.comment.length>0 || authenticate">
      <div v-if="authenticate">Twój komentarz:
        <b-form-textarea
          max-rows="6"
          v-model.lazy.trim="item.comment"
          placeholder="Tutaj wpisz swój komentarz"
        ></b-form-textarea>
      </div>
      <div v-else class="white-space: pre">{{item.comment}}</div>
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
    pay() {
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
