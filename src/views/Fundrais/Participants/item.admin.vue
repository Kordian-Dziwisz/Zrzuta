<template>
  <div class="ParticipantsListItem">
    <span>{{item.index + 1}}: {{item.name}} |</span>
    <span>{{item.comment}} |</span>
    <span v-if="item.paid && !item.accepted">Wpłacono |</span>
    <span v-if="item.accepted">Otrzymano</span>
    <div class="control">
      <b-button class="mx-1" @click="accepted" v-if="!item.accepted">Zaakceptuj</b-button>
      <b-button class="mx-1" @click="remove">Usuń</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    accepted() {
      this.$emit("accepted", this.item.index);
      this.accepted = true;
    },
    remove() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>
