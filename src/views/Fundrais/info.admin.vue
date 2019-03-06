<template>
  <div class="ProjectInfo container">
    <label>Utworzył: {{info.creator}}</label>
    <br>

    <label>Tytuł:</label>&nbsp;
    <b-input type="text" v-model="newInfo.title" placeholder="wpisz tytuł zbiórki" class="d-inline w-25"/>
    <br>

    <label>Opis:</label>&nbsp;
    <b-textarea v-model="newInfo.description" placeholder="wpisz opis zbiórki"></b-textarea>
    <hr>

    <label>Zbiórka rozpoczęła się:</label>&nbsp;
    <p class="border-bottom font-weight-bold">{{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("h:mm")}}</p>


    <label>Data zakończenia:</label>
    <datepicker v-model="newInfo.endDate" class="border-bottom border-rounded"/>
    <br>

    <label>Status:&nbsp;</label>
    <span class="font-weight-bold text-danger h5" v-if="newInfo.ended">Zakończona</span>
    <span class="font-weight-bold text-success h5" v-else>Otwarta</span>&nbsp;
    <b-button
      class="mb-1 btn-outline-success btn-light"
      size="sm"
      @click="newInfo.ended = !newInfo.ended"
      v-if="newInfo.ended"
    >Otwórz</b-button>
    <b-button
      class="mb-1 btn-outline-danger btn-light"
      @click="newInfo.ended = !newInfo.ended"
      size="sm"
      v-else
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
<style>
input {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>