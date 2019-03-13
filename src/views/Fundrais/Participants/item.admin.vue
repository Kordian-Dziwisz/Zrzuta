<template>
  <b-card-group class="my-2">
    <b-card-header class="w-100">
      <div class="row">
        <div class="col">
          {{item.name}}
          <div>
            <span class="text-success" v-if="item.paid && !item.accepted">
              <strong>Wpłacono</strong>
            </span>
            <span class="text-primary" v-if="item.accepted">
              <strong>Otrzymano</strong>
            </span>
          </div>
        </div>
        <div class="col text-right"></div>
        <div>
          <b-button
            class="mt-1 btn-outline-primary btn-light"
            size="sm"
            v-if="!item.accepted && ended"
            @click="accepted"
          >
            <i class="fas fa-vote-yea"></i>
            Zaakceptuj
          </b-button>
          <b-button class="btn-outline-danger btn-light" size="sm" @click="remove">
            <i class="fas fa-user-minus"></i>
            Usuń
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card>
      <div>
        <b-textarea v-model.lazy.trim="item.comment" v-if="authenticate"></b-textarea>
        <div class="font-weight-light" v-else>{{item.comment}}</div>
      </div>
    </b-card>
  </b-card-group>
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
