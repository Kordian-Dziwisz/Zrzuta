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
        Za:
        <span class="text-success">{{item.likes.length}}</span>
        Przeciw:
        <span class="text-danger">{{item.dislikes.length}}</span>
      </span>
    </div>
    <div class="row my-1">
      <div class="col-lg-3 pr-0">
        <b-button class="btn-outline-danger btn-light" size="sm" @click="remove">
          Usuń
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </div>
      <div class="col-lg-4 pl-0">
        <b-button class="btn-outline-success btn-light" size="sm" @click="accept">
          Akceptuj
          <i class="fas fa-vote-yea"></i>
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
    remove() {
      this.$emit("remove", this.item.index);
    },
    accept() {
      this.$emit("accept", this.item.index);
    }
  }
};
</script>
