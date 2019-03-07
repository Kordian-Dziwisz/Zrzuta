<template>
  <div class="container">
    <div class="row border">
      <span class="col-lg-4 border-right align-self-center text-center">{{item.name}}</span>
      <span class="col-lg-2 border-right align-self-center text-center">x{{item.number}}</span>
      <span class="col-lg-3 border-right align-self-center text-center">{{item.price + " zł"}}</span>
      <span
        class="col-lg-3 align-self-center text-center"
      >{{item.price.toFixed(2) * item.number + " zł"}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
