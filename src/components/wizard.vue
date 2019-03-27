<template>
  <div class="float-right wizard-container">
    <div class="mr-4 text-center" :class="{'after': numOfStage != 1}">
      <i class="fas fa-list-ol text-success"></i>
      <p>Zapisy</p>
    </div>
    <div class="text-center" :class="{'after': numOfStage != 2}">
      <i class="fas fa-dollar-sign text-warning"></i>
      <p>Wpłaty</p>
    </div>
    <div class="ml-4 text-center" :class="{'after': numOfStage != 3}">
      <i class="fas fa-lock text-danger"></i>
      <p>Koniec</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    numOfStage: Number
  }
};
</script>

<style scoped>
.after {
  opacity: 0.2;
}
.wizard-container {
  font-size: medium;
}
.wizard-container div {
  display: inline-block;
}
</style>

