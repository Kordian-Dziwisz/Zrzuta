<template>
  <div class="container">
    <span class="col-lg-auto">
      {{item.name}}
      <span v-if="item.number > 1">x{{item.number}}</span>
    </span>
    <span class="col-lg-3">{{item.price + " zł"}}</span>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
