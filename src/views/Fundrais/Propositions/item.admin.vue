<template>
  <div class="ParticipantsListItem">
    <!-- display properties index:creator:number|name|price|totalcost -->
    {{item.index + 1}}: {{item.creator}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}} | {{item.likes.length}} | {{item.dislikes.length}}
    <div class="control">
      <b-button class="mx-1" @click="removeItem">Usuń</b-button>
      <b-button class="mx-1" @click="acceptItem">Akceptuj</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    removeItem() {
      this.$emit("remove", this.item.index);
    },
    acceptItem() {
      this.$emit("accept", this.item.index);
    }
  }
};
</script>
