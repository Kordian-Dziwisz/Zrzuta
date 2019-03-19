<template>
  <b-card class="border rounded">
    <b-card-title v-if="isEdited">
      <label class="h6 font-weight-normal">Tytuł:</label>
      <span class="float-right small">
        <h4 class="d-inline text-danger" v-if="newInfo.ended">Zbiórka jest zakończona</h4>
        <h4 class="d-inline text-warning" v-else>Zbiórka trwa do:</h4>
        <b-button
          class="mx-1 mb-2 btn-light"
          type="button"
          :class="{'btn-outline-danger': !newInfo.ended, 'btn-outline-success': newInfo.ended}"
          @click="end()"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Zakończ"
        >{{newInfo.ended ? "Otwórz" : "Zakończ"}}</b-button>
        <b-button
          v-if="isEdited"
          type="submit"
          class="mx-1 mb-2 btn-outline-success btn-light"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Zapisz"
          @click="update"
        >Zapisz</b-button>
        <b-button
          class="mx-1 mb-2 btn-outline-secondary"
          type="button"
          variant="light"
          @click="isEdited = !isEdited"
          size="sm"
          v-if="isAdmin"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Anuluj"
        >Anuluj</b-button>
      </span>
      <b-input
        class="w-50"
        id="titleName"
        type="text"
        placeholder="Wpisz tytuł zbiórki"
        maxlength="50"
        v-model.trim="newInfo.title"
        :state="validation"
      />
      <b-form-invalid-feedback :state="validation">Tytuł musi mieć od 3 do 50 znaków!</b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">Wygląda dobrze!</b-form-valid-feedback>
    </b-card-title>
    <b-card-title v-else>
      <h2 class="d-inline">{{info.title}}</h2>
      <span class="float-right small">
        <h4 class="d-inline text-danger" v-if="newInfo.ended">Zbiórka jest zakończona</h4>
        <h4 class="d-inline text-warning" v-else>Zbiórka trwa do {{ info.endDate | moment("LL")}}</h4>
        <b-button
          class="mb-2 ml-3 btn-outline-secondary"
          type="button"
          variant="light"
          @click="isEdited = !isEdited"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Edytuj"
          size="sm"
          v-if="isAdmin"
        >Edytuj</b-button>
      </span>
    </b-card-title>
    <b-card-body v-if="isEdited">
      <b-card-text>
        <!-- <b-row class="border-bottom py-2">
          <b-col>
            <label>Zbiórka:</label>
            <h5>{{ info.creationDate | moment("LLL")}}</h5>
          </b-col>
          <b-col class="text-right">
            <label>Zbiórka kończy się:</label>
          </b-col>
        </b-row>-->
        <div class="row">
          <div class="col">
            <label>Opis:</label>
            <b-form-textarea
              placeholder="Wpisz opis zbiórki"
              maxlength="300"
              max-rows="10"
              v-model="newInfo.description"
            ></b-form-textarea>
          </div>
          <div class="col">
            <label>Informacje o płatności:</label>
            <b-form-textarea
              type="text"
              maxlength="150"
              max-rows="10"
              placeholder="Wpisz informacje o płatności"
              v-model.lazy.trim="newInfo.accountNumber"
            ></b-form-textarea>
          </div>
        </div>
      </b-card-text>
    </b-card-body>
    <b-card-body v-else>
      <b-card-text>
        <b-row class="py-2">
          <b-col v-if="info.description.length">
            <label>Opis:</label>
            <h5>{{info.description}}</h5>
          </b-col>
          <b-col v-if="info.accountNumber">
            <label>Informacje o płatności:</label>
            <h5>{{info.accountNumber}}</h5>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: {
    info: Object,
    isAdmin: false
  },
  data() {
    return {
      newInfo: Object,
      userid: "",
      isEdited: false
    };
  },
  methods: {
    update() {
      if (this.newInfo.title.length >= 3 && this.newInfo.title.length < 50) {
        this.isEdited = !this.isEdited;
        this.$emit("info", { ...this.newInfo });
      }
    },
    end() {
      this.newInfo.ended = !this.newInfo.ended;
    }
  },
  computed: {
    validation() {
      return this.newInfo.title.length > 3 && this.newInfo.title.length < 50;
    }
  },
  mounted() {
    this.newInfo = { ...this.info };
  }
};
</script>
<style scoped>
input {
  border: 1px solid #ced4da;
  border-radius: 4.5px;
}
h5 {
  white-space: pre-line;
}
</style>