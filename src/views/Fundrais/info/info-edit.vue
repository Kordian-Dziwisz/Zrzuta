<template>
  <b-card>
    <b-card-title title-tag="div">
      <div class="row">
        <div class="col-6">
          <label>Tytuł:</label>
          <b-input
            id="titleName"
            type="text"
            placeholder="Wpisz tytuł zbiórki"
            maxlength="50"
            v-model.trim="newInfo.title"
            :state="dirty ? validation : null"
            @update="dirty=true"
          />
          <b-form-invalid-feedback :state="validation">Tytuł musi mieć od 3 do 50 znaków!</b-form-invalid-feedback>
        </div>
        <div class="col">
          <wizard
            class="pt-5px"
            @updateStage="updateWizardStage"
            :inStage="wizardStage"
            :isEditing="isEditing"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 float-left">
          <label class="h6 font-weight-normal">Data zakończenia:</label>
          <br>
          <date-picker
            type="datetime"
            :time-picker-options="timePickerOptions"
            :lang="dtLang"
            v-model="newInfo.endDate"
            format="DD-MM-YYYY HH:mm"
            input-class="form-control"
          ></date-picker>
        </div>
      </div>
    </b-card-title>
    <b-card-body class="px-0">
      <div class="row">
        <div class="col">
          <label>Opis:</label>
          <b-form-textarea
            placeholder="Wpisz opis zbiórki"
            maxlength="500"
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
            placeholder="Wpisz informacje o płatności: dane odbiorcy, rodzaj (przelew lub płatność gotówką)"
            v-model.lazy.trim="newInfo.accountNumber"
          ></b-form-textarea>
        </div>
      </div>
    </b-card-body>
    <b-card-footer class="text-right footer-style p-0">
      <b-button
        class="mx-1 mt-1 btn-outline-secondary"
        type="button"
        variant="light"
        @click="closeEditing()"
        size="sm"
        data-toggle="tooltip"
        data-placement="auto"
        v-b-tooltip.hover
        title="Anuluj"
      >Anuluj</b-button>
      <b-button
        type="submit"
        class="mx-1 mt-1 btn-outline-success btn-light"
        size="sm"
        data-toggle="tooltip"
        data-placement="auto"
        v-b-tooltip.hover
        title="Zapisz"
        @click="update()"
      >Zapisz</b-button>
    </b-card-footer>
  </b-card>
</template>
<script>
import DatePicker from "vue2-datepicker";
import Wizard from "@/components/wizard.vue";

export default {
  props: {
    newInfo: Object,
    isAfterDate: Boolean,
    isEditing: Boolean,
    wizardStage: Number
  },
  data() {
    return {
      dirty: false,
      timePickerOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      },
      dtLang: {
        days: ["Nie", "Pon", "Wt", "Śr", "Czw", "Pt", "So"],
        months: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
        pickers: ["kolejne 7 dni", "kolejne 30 dni", "poprzednie 7 dni", "poprzednie 30 dni"],
        placeholder: {
          date: "Wybierz datę",
          dateRange: "Wybierz daty"
        }
      }
    };
  },
  methods: {
    update() {
      if (this.validation) {
        this.closeEditing();
        this.$emit("update", { ...this.newInfo });
        this.dirty = false;
      }
    },
    changeStage() {
      this.newInfo.ended = !this.newInfo.ended;
    },
    closeEditing() {
      this.$emit("closeEditing");
    },
    updateWizardStage(stage) {
      switch (stage) {
        case 1:
          this.newInfo.ended = false;
          break;
        case 2:
          this.newInfo.ended = true;
          break;
      }
    }
  },
  computed: {
    validation() {
      return this.newInfo.title.length >= 3 && this.newInfo.title.length <= 50;
    }
  },
  components: {
    DatePicker,
    Wizard
  }
};
</script>
<style scoped>
.pt-5px {
  padding-top: 5px;
}
.footer-style {
  background-color: #fff;
  border: none;
}
</style>


