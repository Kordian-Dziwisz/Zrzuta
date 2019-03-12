<template>
  <div class="container-fluid w-75">
    <h4 class="display-4">Lista zbiórek</h4>
    <h5
      v-if="list.length === 0"
    >Brak aktywnych zbiórek - utwórz nową lub poproś o zaproszenie do obecnej.</h5>
    <ul class="list-group" v-for="(item, index) in list" :key="index">
      <Item class="list-group-item" :item="{index: index, ...item}" @remove="remove"/>
    </ul>
  </div>
</template>
<script>
import Item from "@/views/Home/item.vue";
export default {
  props: {
    list: Array
  },
  methods: {
    remove(event) {
      this.list.splice(event.index, 1);
      this.$emit("remove", event.id);
    }
  },
  components: {
    Item
  }
};
</script>
