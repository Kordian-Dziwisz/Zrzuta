<template>
  <div class="container-fluid w-75">
    <h2 class="font-weight-light">
      <span>Lista zbiórek</span>
      <b-badge pill variant="success" class="float-right"></b-badge>
    </h2>
    <b-alert
      variant="warning"
      :show="list.length === 0"
    >Brak aktywnych zbiórek - utwórz nową lub poproś o zaproszenie do obecnej.</b-alert>
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
