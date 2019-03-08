<template>
  <div class="ParticipantsListItem container mt-1">
    <div class="row">
      <span class="col-lg-3 align-self-center text-left">{{item.creator}}:</span>
      <span class="col-lg-3 px-0 align-self-center text-left">{{item.name}}</span>
      <span class="col-lg-2 align-self-center text-center">{{item.number}}</span>
      <span class="col-lg-2 px-0 align-self-center text-center">{{item.price + " zł"}}</span>
      <span class="col-lg-2 pl-0 align-self-center text-center">
        Za:
        <span class="text-success">{{item.likes.length}}</span>
      </span>
    </div>
    <b-row>
      <b-col>
        <b-button
          class="btn-outline-success btn-light"
          size="sm"
          @click="like"
          v-if="!isLiked"
        >Jestem za!</b-button>
      </b-col>
      <b-col>
        <b-button class="btn-outline-danger btn-light" size="sm" @click="remove">
          Usuń
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </b-col>
      <b-col>
        <b-button class="btn-outline-success btn-light" size="sm" @click="accept">
          Akceptuj
          <i class="fas fa-vote-yea"></i>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    like() {
      this.$emit("like", this.item.index);
    },
    remove() {
      this.$emit("remove", this.item.index);
    },
    accept() {
      this.$emit("accept", this.item.index);
    }
  },
  computed: {
    isLiked() {
      return this.item.likes.includes(localStorage.getItem("login"));
    }
  }
};
</script>
