<template>
  <div class="ParticipantsListItem">
    <!-- display properties index:creator:number|name|price|totalcost -->
    {{item.index + 1}}: {{item.creator}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}} | {{item.likes.length}} | {{item.dislikes.length}}
    <div class="control">
      <b-button class="mx-1" @click="remove">Usuń</b-button>
      <b-button class="mx-1" @click="accept">Akceptuj</b-button>
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
