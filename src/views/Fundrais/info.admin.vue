<template>
  <div class="ProjectInfo container">
    <label>Utworzył:&nbsp;{{info.creator}}</label>
    <br>
    <label>Tytuł:</label>
    <br>
    <b-textarea
      class="d-inline w-75"
      type="text"
      placeholder="Wpisz tytuł zbiórki"
      maxlength="50"
      v-model.lazy.trim="newInfo.title"
    ></b-textarea>
    <br>

    <label>Opis:</label>&nbsp;
    <b-textarea
      placeholder="Wpisz opis zbiórki"
      maxlength="300"
      v-model.lazy.trim="newInfo.description"
    ></b-textarea>
    <hr>

    <label>Zbiórka rozpoczęła się:</label>&nbsp;
    <p class="border-bottom">
      <strong>{{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("H:mm")}}</strong>
    </p>

    <label>Data zakończenia:</label>
    <datepicker
      v-model="newInfo.endDate"
      input-class="form-control bg-white w-50"
      :language="pl"
      format="D, d MMM yyyy"
      :disabledDates="disabledDates"
    />
    <timepicker v-model="endTime" format="H:m" @change="updateTime()"/>
    <br>
    <br>
    <label>Status:&nbsp;</label>
    <span class="text-danger" v-if="newInfo.ended">
      <strong>Zakończona</strong>
    </span>
    <span class="text-success" v-else>
      <strong>Otwarta</strong>
    </span>&nbsp;
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
      v-model.lazy.trim="newInfo.accountNumber"
    />
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import Timepicker from "vuejs-timepicker";
import { en, pl } from "vuejs-datepicker/dist/locale";

export default {
  props: {
    info: Object
  },
  data() {
    return {
      pl: pl,
      en: en,
      newInfo: Object,
      endTime: {
        H: "12",
        m: "12",
        s: "12"
      },
      disabledDates: {
        to: new Date(Date.now() - 86400000)
      }
    };
  },
  watch: {
    newInfo: {
      handler() {
        this.$emit("info", this.newInfo);
      },
      deep: true
    },
    endTime: {
      handler() {
        this.newInfo.endDate.setHours(parseInt(this.endTime.H));
        this.newInfo.endDate.setMinutes(parseInt(this.endTime.m));
        this.newInfo.endDate.setSeconds(parseInt(this.endTime.s));
        this.$emit("info", this.newInfo);
      },
      deep: true
    }
  },
  mounted() {
    this.newInfo = { ...this.info };
    this.endTime.H = this.info.endDate.getHours();
    this.endTime.m = this.info.endDate.getMinutes();
    this.endTime.s = this.info.endDate.getSeconds();
  },
  components: {
    Datepicker,
    Timepicker
  }
};
</script>
<style scoped>
input {
  border: 1px solid #ced4da;
  border-radius: 4.5px;
}
</style>