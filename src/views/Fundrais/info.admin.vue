<template>
  <div class="ProjectInfo container">
    <label>Utworzył: {{info.creator}}</label>
    <br>

    <label>Tytuł:</label>&nbsp;
    <b-input
      type="text"
      v-model.lazy.trim="newInfo.title"
      placeholder="wpisz tytuł zbiórki"
      class="d-inline w-75"
    />
    <br>

    <label>Opis:</label>&nbsp;
    <b-textarea v-model.lazy.trim="newInfo.description" placeholder="wpisz opis zbiórki"></b-textarea>
    <hr>

    <label>Zbiórka rozpoczęła się:</label>&nbsp;
    <p
      class="border-bottom font-weight-bold"
    >{{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("h:mm")}}</p>

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
        H: "11",
        m: "42",
        s: "42"
      },
      disabledDates: {
        to: new Date(Date.now())
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
    this.endTime.HH = toString(this.newInfo.endDate.getHours());
    this.endTime.mm = toString(this.newInfo.endDate.getMinutes());
    this.endTime.ss = toString(this.newInfo.endDate.getSeconds());
  },
  components: {
    Datepicker,
    Timepicker
  }
};
</script>
<style>
input {
  border: 1px solid #ced4da;
  border-radius: 4.5px;
}
</style>