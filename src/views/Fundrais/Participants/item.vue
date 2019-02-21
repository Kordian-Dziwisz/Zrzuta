<template>
  <div class="ParticipantsListItem">
    <span>{{item.index + 1}}: {{item.name}} |</span>
    <span>{{item.comment}} |</span>
    <span v-if="item.paid && you">Zapłacono</span>
    <span v-if="item.accepted && you">Otrzymano</span>
    <div class="control">
      <b-button class="mx-1" @click="setComment" v-if="you">
        <i class="far fa-comment"></i>coś
      </b-button>
      <b-button class="mx-1" @click="setPaid" v-if="you && !item.paid">Zapłaciłem</b-button>
      <b-button class="mx-1" @click="removeItem" v-if="you">Usuń</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    you: false
  },
  methods: {
    setComment() {
      this.$emit("comment", this.item.index);
    },
    setPaid() {
      if (this.item.accepted == false) {
        this.$emit("paid", this.item.index);
      }
    },
    removeItem() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>
