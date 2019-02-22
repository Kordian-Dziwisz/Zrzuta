<template>
  <div class="ParticipantsListItem">
    <!-- display properties index:creator:number|name|price|totalcost -->
    {{item.index + 1}}: {{item.creator}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}} | {{item.likes.length}} | {{item.dislikes.length}}
    <div class="control">
      <b-button class="mx-1" @click="likeItem" v-if="!authenticate && !isLiked">Like</b-button>
      <b-button class="mx-1" @click="dislikeItem" v-if="!authenticate && !isDisliked">Dislike</b-button>
      <b-button class="mx-1" @click="removeItem" v-if="authenticate">Usuń</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    likeItem() {
      this.$emit("like", this.item.index);
    },
    dislikeItem() {
      this.$emit("dislike", this.item.index);
    },
    removeItem() {
      this.$emit("remove", this.item.index);
    },
    acceptItem() {
      this.$emit("accept", this.item.index);
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
