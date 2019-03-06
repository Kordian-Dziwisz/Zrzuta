<template>
  <div class="ParticipantsListItem">
    <div>
      <span class="col-lg-2 px-1">{{item.creator}}:</span>
      <span class="col-lg-auto px-0">
        {{item.name}}
        <span v-if="item.number > 1">x{{item.number}}</span>
      </span>
      <span class="col-lg-2 pl-2">{{item.price + " zł"}}</span>
      <span class="col-lg-2 px-0">
        Za:&nbsp;
        <span class="text-success">{{item.likes.length}}</span>
        Przeciw:&nbsp;
        <span class="text-danger">{{item.dislikes.length}}</span>
      </span>
    </div>
    <div class="row my-1">
      <div class="col-lg-2">
        <b-button
          class="btn-outline-success btn-light"
          size="sm"
          @click="like"
          v-if="!authenticate && !isLiked"
        >Za!</b-button>
      </div>
      <div class="col-lg-2">
        <b-button
          class="btn-outline-danger btn-light"
          size="sm"
          @click="dislike"
          v-if="!authenticate && !isDisliked"
        >Przeciw!</b-button>
      </div>
      <div class="col-lg-2">
        <b-button
          class="btn-outline-danger btn-light"
          size="sm"
          @click="remove"
          v-if="authenticate"
        >Usuń</b-button>
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
    dislike() {
      this.$emit("dislike", this.item.index);
    },
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
    },
    isDisliked() {
      return this.item.dislikes.includes(localStorage.getItem("login"));
    }
  }
};
</script>
