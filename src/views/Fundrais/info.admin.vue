<template>
  <b-card-group class="mx-auto">
    <b-card-header class="w-100">Informacje o projekcie</b-card-header>
    <b-card>
      <b-card-body v-if="isEdited">
        <b-button @click="isEdited = !isEdited">Edytuj</b-button>
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
        <p
          class="border-bottom font-weight-bold"
        >{{ info.creationDate | moment("dddd, D MMMM YYYY")}} o godzinie: {{ info.creationDate | moment("H:mm")}}</p>

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
      </b-card-body>
      <b-card-body class="w-100" v-else>
        <b-card-title class="border-bottom align-middle">
          <h2 class="d-inline">{{info.title}}&nbsp;</h2>
          <span class="font-weight-light">stworzona przez:</span>
          <h4 class="d-inline">{{info.creator}}</h4>

          <b-button @click="isEdited = !isEdited">Edytuj</b-button>
        </b-card-title>

        <b-card-text>
          <h5 v-if="info.description.length" class="pb-5">{{ellipsis(info.description, 10)}}</h5>
          <label>Zbiórka rozpoczęła się:</label>
          <h5>{{ info.creationDate | moment("LLL")}}</h5>
        </b-card-text>

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
      </b-card-body>
    </b-card>
  </b-card-group>
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
      isEdited: false,
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