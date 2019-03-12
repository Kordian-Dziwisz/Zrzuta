<template>
  <b-card-group class="mx-auto" ref="info">
    <b-card-header class="w-100">Informacje o projekcie</b-card-header>
    <b-card>
      <b-card-body v-if="isEdited">
        <form @submit.prevent="update()">
          <b-card-title class="mb-0 border-bottom align-middle">
            <b-row>
              <b-col>
                <b-input
                  class="d-inline w-50"
                  maxlength="50"
                  placeholder="Tytuł"
                  v-model.trim="newInfo.title"
                ></b-input>&nbsp;
                <h5 class="font-weight-light d-inline">stworzona przez:&nbsp;</h5>
                <h5 class="d-inline">{{newInfo.creator}}</h5>
              </b-col>
              <b-col class="text-right">
                <h4 class="d-inline text-danger" v-if="newInfo.ended">Zbiórka jest zakończona</h4>
                <h4 class="d-inline text-success" v-else>Zbiórka jest w trakcie</h4>
                <b-button
                  class="mb-2 ml-3 btn-light"
                  :class="{'btn-outline-danger': !newInfo.ended, 'btn-outline-success': newInfo.ended}"
                  @click="newInfo.ended = !newInfo.ended"
                  size="sm"
                >{{newInfo.ended? "Otwórz" : "Zakończ"}}</b-button>&nbsp;
                <b-button
                  type="submit"
                  class="ml-3 mb-2 btn-outline-success btn-light"
                  size="sm"
                  @click="isEdited = !isEdited"
                >Zapisz</b-button>
              </b-col>
            </b-row>
          </b-card-title>
          <b-card-text>
            <b-row class="border-bottom py-2">
              <b-col>
                <label>Zbiórka rozpoczęła się:</label>
                <h5>{{ info.creationDate | moment("LLL")}}</h5>
              </b-col>
              <b-col class="text-right">
                <label>Zbiórka kończy się:</label>
                <datepicker
                  v-model="newInfo.endDate"
                  input-class="form-control bg-white w-50"
                  :language="pl"
                  format="D, d MMM yyyy"
                  :disabledDates="disabledDates"
                />
                <timepicker v-model="endTime" format="H:m" @change="updateTime()"/>
              </b-col>
            </b-row>

            <label>Opis:</label>&nbsp;
            <b-textarea
              placeholder="Wpisz opis zbiórki"
              rows="5"
              maxlength="300"
              v-model.trim="newInfo.description"
            ></b-textarea>

            <label>Informacje o płatności:</label>
            <b-textarea
              class="mb-1"
              type="text"
              rows="5"
              maxlength="150"
              placeholder="Informacje o płatności"
              v-model.lazy.trim="newInfo.accountNumber"
            />
          </b-card-text>
        </form>
      </b-card-body>
      <b-card-body class="w-100" v-else>
        <b-card-title class="mb-0 border-bottom align-middle">
          <b-row>
            <b-col>
              <h2 class="d-inline">{{newInfo.title}}&nbsp;</h2>
              <h5 class="font-weight-light d-inline">stworzona przez:&nbsp;</h5>
              <h5 class="d-inline">{{newInfo.creator}}</h5>
            </b-col>
            <b-col class="text-right">
              <h4 class="d-inline text-danger" v-if="newInfo.ended">Zbiórka jest zakończona</h4>
              <h4 class="d-inline text-success" v-else>Zbiórka jest w trakcie</h4>

              <b-button
                class="ml-5 mb-2 btn-outline-primary btn-light"
                size="sm"
                @click="isEdited = !isEdited"
              >Edytuj</b-button>
            </b-col>
          </b-row>
        </b-card-title>

        <b-card-text>
          <b-row class="border-bottom py-2">
            <b-col>
              <label>Zbiórka rozpoczęła się:</label>
              <h5>{{ info.creationDate | moment("LLL")}}</h5>
            </b-col>
            <b-col class="text-right">
              <label>Zbiórka kończy się:</label>
              <h5 class="text-danger">{{ newInfo.endDate | moment("LLL")}}</h5>
            </b-col>
          </b-row>

          <label class="pt-2">Opis:</label>
          <p
            v-if="info.description.length"
            class="border-bottom"
            style="white-space: pre"
          >{{info.description}}</p>

          <label class="pt-2" v-if="info.accountNumber">Informacje o płatności:</label>
          <h5 style="white-space: pre">{{info.accountNumber}}</h5>
        </b-card-text>
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
      ellipsis: require("text-ellipsis"),
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
  methods: {
    update() {
      this.$emit("info", this.newInfo);
    }
  },
  watch: {
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