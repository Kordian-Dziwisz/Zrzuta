<template>
  <b-container fluid class="w-75">
    <p class="display-4">Lista zbiórek</p>
    <ul class="list-group" v-for="(item, index) in list" :key="index">
      <p v-if="list.length == 0">Brak aktywnych zbiórek</p>
      <Item class="list-group-item" :item="{index: index, ...item}" @remove="removeItem"/>
    </ul>
  </b-container>
</template>

<script>
import Item from "@/views/Home/item.vue";
export default {
  props: {
    list: Array
  },
  methods: {
    removeItem(event) {
      this.list.splice(event.index, 1);
      this.$emit("remove", event.id);
    }
  },
  components: {
    Item
  }
};
</script>