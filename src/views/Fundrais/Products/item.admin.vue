<template>
  <div class="ParticipantsListItem">
    {{item.index + 1}}: {{item.number + " szt"}} | {{item.name}} | {{item.price + " zł"}} | {{(item.price * item.number).toFixed(2) + " zł"}}
    <div class="control">
      <b-button class="mx-1" @click="number">Sztuki</b-button>
      <b-button class="mx-1" @click="name">Nazwa</b-button>
      <b-button class="mx-1" @click="price">Cena</b-button>
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
    number() {
      this.$emit("number", this.item.index);
    },
    name() {
      this.$emit("name", this.item.index);
    },
    price() {
      this.$emit("price", this.item.index);
    },
    remove() {
      this.$emit("remove", this.item.index);
    }
  }
};
</script>