<template>
  <div class="ParticipantsListItem container mt-1">
    <div class="row border">
      <span class="col-lg-3 border-right align-self-center text-center">{{item.creator}}:</span>
      <span class="col-lg-3 px-0 border-right align-self-center text-center">{{item.name}}</span>
      <span class="col-lg-2 border-right align-self-center text-center">x{{item.number}}</span>
      <span class="col-lg-2 px-0 border-right align-self-center text-center">{{item.price + " zł"}}</span>
      <span class="col-lg-2 pl-0 border-right align-self-center text-center">
        Za:
        <span class="text-success">{{item.likes.length}}</span>
      </span>
    </div>
    <div class="row my-1">
      <div class="col-lg-3 pr-0 my-1">
        <b-button class="btn-outline-danger btn-light" size="sm" @click="remove">
          Usuń
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </div>
      <div class="col-lg-4 pl-0 my-1">
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
