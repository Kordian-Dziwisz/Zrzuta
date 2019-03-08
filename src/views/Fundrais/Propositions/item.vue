<template>
  <div class="ParticipantsListItem container mt-1">
    <div class="row">
      <span class="col-lg-3 align-self-center text-left">{{item.creator}}:</span>
      <span class="col-lg-3 px-0 align-self-center text-center">{{item.name}}</span>
      <span class="col-lg-2 align-self-center text-center">{{item.number}}</span>
      <span class="col-lg-2 px-0 align-self-center text-center">{{item.price + " zł"}}</span>
      <span class="col-lg-2 pl-0 align-self-center text-center">
        Za:
        <span class="text-success">{{item.likes.length}}</span>
      </span>
    </div>
    <div class="row my-1">
      <div class="col-lg-3 pr-0 my-1">
        <b-button
          class="btn-outline-success btn-light"
          size="sm"
          @click="like"
          v-if="!authenticate && !isLiked"
        >Za!</b-button>
        <b-button
          class="btn-outline-danger btn-light"
          size="sm"
          @click="remove"
          v-if="authenticate"
        >
          Usuń
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </div>
    </div>
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
    // dislike() {
    //   this.$emit("dislike", this.item.index);
    // },
    remove() {
      this.$emit("remove", this.item.index);
    }
  },
  computed: {
    authenticate() {
      return this.item.creator == localStorage.getItem("login");
    },
    isLiked() {
      return this.item.likes.includes(localStorage.getItem("login"));
    }
    // isDisliked() {
    //   return this.item.dislikes.includes(localStorage.getItem("login"));
    // }
  }
};
</script>
