<template>
  <div class="float-right wizard-container">
    <template>
      <a :class="{'cursorPointer': isEditing}" @click="isEditing ? stage = 1 : null">
        <div class="mr-4 text-center" :class="{'after': stage != 1}">
          <i class="fas fa-list-ol text-success"></i>
          <p>Zapisy</p>
        </div>
      </a>
      <a :class="{'cursorPointer': isEditing}" @click="isEditing ? stage = 2 : null">
        <div class="text-center" :class="{'after': stage != 2}">
          <i class="fas fa-dollar-sign text-warning"></i>
          <p>Wpłaty</p>
        </div>
      </a>
      <div class="ml-4 text-center" :class="{'after': stage != 3}">
        <i class="fas fa-lock text-danger"></i>
        <p>Koniec</p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    inStage: Number,
    isEditing: Boolean
  },
  data() {
    return {
      stage: Number
    };
  },
  watch: {
    stage() {
      this.$emit("updateStage", this.stage);
    }
  },
  created() {
    this.stage = this.inStage;
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
.cursorPointer {
  cursor: pointer;
}
</style>

