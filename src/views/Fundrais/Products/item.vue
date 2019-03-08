<template>
  <div class="container">
    <b-row class="row">
      <b-col class="lg-5 align-self-center text-center">{{item.name}}</b-col>
      <b-col class="lg-5 align-self-center text-center">{{item.number}}</b-col>
      <b-col class="lg-3 align-self-center text-right">{{item.price + " zł"}}</b-col>
      <b-col
        class="lg-3 align-self-center text-right"
      >{{item.price.toFixed(2) * item.number + " zł"}}</b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
