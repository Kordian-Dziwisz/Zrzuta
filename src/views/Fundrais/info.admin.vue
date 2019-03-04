<template>
  <div class="ProjectInfo">
    <p>Created by: {{info.creator}}</p>
    <p>
      Title:
      <input type="text" v-model="newInfo.title">
    </p>
    <p>Desc:
      <br>
      <textarea v-model="newInfo.description"></textarea>
    </p>
    <p>Zbiórka rozpoczęła się: {{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("h:mm")}}</p>
    <br>
    <p>endDate:</p>
    <datepicker v-model="newInfo.endDate"/>
    isEnded: {{newInfo.ended}} endThis:
    <button @click="newInfo.ended = !newInfo.ended">END</button>
    here add your account number:
    <input type="text" v-model="newInfo.accountNumber">
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";

export default {
  props: {
    info: Object
  },
  data() {
    return {
      newInfo: Object
    };
  },
  watch: {
    newInfo: {
      handler() {
        this.$emit("info", this.newInfo);
      },
      deep: true
    }
  },
  mounted() {
    this.newInfo = { ...this.info };
  },
  components: {
    Datepicker
  }
};
</script>