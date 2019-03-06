<template>
  <div class="ParticipantsListItem">
    {{item.index + 1}}: {{item.creator}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}} | {{item.likes.length}} | {{item.dislikes.length}}
    <div class="control">
      <b-button class="mx-1" @click="like" v-if="!authenticate && !isLiked">Like</b-button>
      <b-button class="mx-1" @click="dislike" v-if="!authenticate && !isDisliked">Dislike</b-button>
      <b-button class="mx-1" @click="remove" v-if="authenticate">Usuń</b-button>
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
