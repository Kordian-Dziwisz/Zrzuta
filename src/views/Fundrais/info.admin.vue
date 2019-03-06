<template>
  <div class="ProjectInfo container">
    <label>Utworzył: {{info.creator}}</label>
    <br>
    <label>Tytuł:</label>
    <b-input type="text" v-model="newInfo.title"/>
    <label>Opis:</label>
    <b-textarea v-model="newInfo.description"></b-textarea>
    <label>
      Zbiórka rozpoczęła się:
      <strong>{{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("h:mm")}}</strong>
    </label>
    <label>Data zakończenia:</label>
    <datepicker v-model="newInfo.endDate"/>Status:
    <label v-if="newInfo.ended">Zakończona</label>
    <label v-else>Otwarta</label>
    <br>
    <b-button
      class="mb-1 btn-outline-danger btn-light"
      @click="newInfo.ended = !newInfo.ended"
    >Zakończ</b-button>
    <b-input
      class="mb-1"
      type="text"
      placeholder="Wpisz numer konta"
      v-model="newInfo.accountNumber"
    />
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