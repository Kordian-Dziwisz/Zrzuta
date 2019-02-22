<template>
  <div class="ParticipantsListItem">
    <span>{{item.index + 1}}: {{item.name}} |</span>
    <span>{{item.comment}} |</span>
    <span v-if="item.paid">Wpłacono |</span>
    <span v-if="item.accepted">Otrzymano</span>
    <div class="control">
      <b-button class="mx-1" @click="setAccepted" v-if="!item.accepted">Zaakceptuj</b-button>
      <b-button class="mx-1" @click="removeItem">Usuń</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    setAccepted() {
      this.$emit("accepted", this.item.index);
      this.accepted = true;
    },
    removeItem() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>
