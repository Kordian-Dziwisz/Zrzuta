<template>
  <div class="ParticipantsListItem">
    {{item.index + 1}}: {{item.number + " szt"}} | {{item.name}} | {{item.price + " zł"}} | {{(item.price * item.number).toFixed(2) + " zł"}}
    <div class="control">
      <b-button class="mx-1" @click="setNumber">Sztuki</b-button>
      <b-button class="mx-1" @click="setName">Nazwa</b-button>
      <b-button class="mx-1" @click="setPrice">Cena</b-button>
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