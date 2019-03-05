<template>
  <div class="ProjectInfo container">
    <p>Utworzył: {{info.creator}}</p>
    <p>Tytuł:
      <b-input type="text" v-model="newInfo.title"/>
    </p>
    <p>Opis:
      <b-textarea v-model="newInfo.description"></b-textarea>
    </p>
    <p>
      Zbiórka rozpoczęła się:
      <strong>{{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("h:mm")}}</strong>
    </p>
    <p>Data zakończenia:</p>
    <datepicker v-model="newInfo.endDate"/>Status:
    <label v-if="newInfo.ended">Zakończona</label>
    <label v-else>Otwarta</label>
    <br>
    <b-button @click="newInfo.ended = !newInfo.ended">Zakończ</b-button>
    <b-input type="text" placeholder="Wpisz numer konta" v-model="newInfo.accountNumber"/>
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