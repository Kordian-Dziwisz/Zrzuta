<template>
  <div class="ParticipantsListItem">
    {{item.index + 1}}: {{item.number + " szt"}} | {{item.name}} | {{item.price + " zł"}} | {{(item.price * item.number).toFixed(2) + " zł"}}
    <div class="control">
      <button @click="setNumber">setNumber</button>
      <button @click="setName">setName!</button>
      <button @click="setPrice">setPrice</button>
      <button @click="removeItem">removeMe!</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    setNumber() {
      this.$emit("number", this.item.index);
    },
    setName() {
      this.$emit("name", this.item.index);
    },
    setPrice() {
      this.$emit("price", this.item.index);
    },
    removeItem() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>