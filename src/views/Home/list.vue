<template>
  <div class="container-fluid w-75">
    <h2 class="font-weight-light">Lista zbiórek</h2>
    <h5
      v-if="list.length === 0"
    >Brak aktywnych zbiórek - utwórz nową lub poproś o zaproszenie do obecnej.</h5>
    <ul class="list-group" v-for="(item, index) in sortedList" :key="index">
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
  computed: {
    sortedList() {
      let tmpList = this.list.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      let endedItems = tmpList.filter(item => {
        return item.ended && new Date(item.endDate).getTime() > Date.now();
      });
      let afterDateItems = tmpList.filter(item => {
        return new Date(item.endDate).getTime() < Date.now();
      });
      let otherItems = tmpList.filter(item => {
        return !item.ended && new Date(item.endDate).getTime() > Date.now();
      });
      return endedItems.concat(otherItems.concat(afterDateItems));
    }
  },
  components: {
    Item
  }
};
</script>
