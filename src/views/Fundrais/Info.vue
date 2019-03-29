<template>
  <!-- <div>
    <b-card class="border rounded" no-body v-if="isEditing && isAdmin">
      <b-card-title class="p-3">
        <div class="row float-right">
          <div class="col mr-3 mb-2">
            <h4 class="d-inline text-dark" v-if="isAfterDate">Zbiórka jest zakończona</h4>
            <h4 class="d-inline text-danger" v-else-if="newInfo.ended">Faza wpłat</h4>
            <h4 class="d-inline text-warning" v-else>Faza zapisów</h4>
          </div>
        </div>
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
          <label class="h6 font-weight-normal">Data zakończenia:</label>
          <br>
          <date-picker
            type="datetime"
            :time-picker-options="timePickerOptions"
            :lang="dtLang"
            v-model="newInfo.endDate"
            format="YYYY-MM-DD HH:mm"
            input-class="form-control"
          ></date-picker>
        </div>
      </b-card-title>
      <b-card-body>
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
      <b-card-footer class="text-right footer-style px-3 pt-0">
        <b-button
          class="mx-1 mt-1 btn-light"
          type="button"
          :class="{'btn-outline-danger': !newInfo.ended, 'btn-outline-success': newInfo.ended}"
          @click="end()"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Wpłaty"
        >{{newInfo.ended ? "Otwórz" : "Zakończ"}}</b-button>
        <b-button
          class="mx-1 mt-1 btn-outline-secondary"
          type="button"
          variant="light"
          @click="isEditing = !isEditing"
          size="sm"
          v-if="isAdmin"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Anuluj"
        >Anuluj</b-button>
        <b-button
          v-if="isEditing"
          type="submit"
          class="mx-1 mt-1 btn-outline-success btn-light"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Zapisz"
          @click="update"
        >Zapisz</b-button>
      </b-card-footer>
  </b-card>-->
  <!-- <b-card v-if="!isEditing">
      <b-card-title>
        <div class="row">
          <div class="col-12 col-lg-5 text-lg-left text-center">
            <h2 class="d-inline">{{info.title}}</h2>
            <p class="small">Trwa do: {{ info.endDate | moment("LL")}}</p>
          </div>
          <div class="col-12 col-lg-7 text-lg-right text-center">
            <wizard class="pt-5px" :numOfStage="wizardStage"/>
          </div>
        </div>
      </b-card-title>
      <b-card-body v-if="info.description.length || info.accountNumber">
        <b-card-text>
          <div class="row py-2">
            <div class="col-6 col-lg-6" v-if="info.description.length">
              <label>
                <strong>Opis:</strong>
              </label>
              <p>{{info.description}}</p>
            </div>
            <div class="col-6 col-lg-6" v-if="info.accountNumber">
              <label>
                <strong>Informacje o płatności:</strong>
              </label>
              <p>{{info.accountNumber}}</p>
            </div>
          </div>
        </b-card-text>
      </b-card-body>
      <b-card-footer v-if="isAdmin" class="text-right footer-style px-3 pt-0">
        <b-button
          class="mb-1 ml-2 btn-outline-secondary"
          type="button"
          variant="light"
          @click="isEditing = !isEditing"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Edytuj"
          size="sm"
        >
          <i class="fas fa-edit fa-fw"></i>
          <span>Edytuj</span>
        </b-button>
  </b-card-footer>-->
  <div>
    <info-main
      v-if="!isEditing"
      :info="newInfo"
      :wizardStage="wizardStage"
      :isAdmin="isAdmin"
      :isEditing="isEditing"
      @openEditing="isEditing = true"
    />
    <info-edit
      v-else
      :newInfo="{ ...newInfo }"
      :wizardStage="wizardStage"
      :isAfterDate="isAfterDate"
      :isEditing="isEditing"
      @closeEditing="isEditing = false"
      @update="update"
    />
  </div>
</template>
<script>
import Wizard from "@/components/wizard.vue";
import InfoMain from "@/views/Fundrais/info/info-main.vue";
import InfoEdit from "@/views/Fundrais/info/info-edit.vue";

export default {
  props: {
    info: Object,
    isAdmin: false
  },
  data() {
    return {
      isEditing: false,
      newInfo: Object
    };
  },
  methods: {
    update(item) {
      this.newInfo = item;
      this.$emit("info", { ...item });
    },
    end() {
      this.newInfo.ended = !this.newInfo.ended;
      if (this.isAfterDate) {
        this.notifyEnded();
      } else if (this.info.ended) {
        this.notifyClosed();
      }
    },
    notifyClosed() {
      this.$notify({
        group: "status",
        title: "Status",
        text: "Zbiórka jest w fazie wpłat, proszę wpłacić daną kwotę",
        type: "warn"
      });
    },
    notifyEnded() {
      this.$notify({
        group: "status",
        title: "Status",
        text: "Termin zbiórki minął, mamy nadzieję że wszystkie kwoty zostały wpłacone",
        type: "error"
      });
    }
  },
  computed: {
    isAfterDate() {
      return this.info.endDate < new Date(Date.now());
    },
    wizardStage() {
      if (!this.isAfterDate) {
        if (this.info.ended) {
          return 2;
        } else {
          return 1;
        }
      } else {
        return 3;
      }
    }
  },
  mounted() {
    this.newInfo = { ...this.info };
  },
  components: {
    InfoMain,
    InfoEdit
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