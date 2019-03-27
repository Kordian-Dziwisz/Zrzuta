<template>
  <div>
    <div class="font-weight-light pb-2 px-4 d-none d-lg-block">
      <b-button variant="outline-success" class="bg-light" @click="showModal=true">
        <i class="fas fa-plus fa-fw"></i>
        <span>Stwórz zbiórkę</span>
      </b-button>
    </div>
    <b-alert
      variant="warning"
      :show="list.length === 0"
    >Brak aktywnych zbiórek - utwórz nową lub poproś o zaproszenie do obecnej.</b-alert>
    <ul class="list-group px-0 px-lg-4" v-for="(item, index) in list" :key="index">
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
