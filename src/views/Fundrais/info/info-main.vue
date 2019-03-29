<template>
  <b-card no-body class="p-2">
    <b-card-title title-tag="div">
      <div class="row">
        <div class="col-12 col-lg-5 text-lg-left text-center">
          <h2 class="d-inline">{{info.title}}</h2>
          <p>Trwa do: {{ info.endDate | moment("LL")}}</p>
        </div>
        <div class="col-12 col-lg-7 text-lg-right text-center">
          <wizard class="pt-5px" :inStage="wizardStage" :isEditing="isEditing"/>
        </div>
      </div>
    </b-card-title>
    <b-card-body class="px-0 pt-0" v-if="info.description.length || info.accountNumber">
      <div class="row">
        <div class="col-6 col-lg-6" v-if="info.description.length">
          <label>Opis:</label>
          <p>{{info.description}}</p>
        </div>
        <div class="col-6 col-lg-6" v-if="info.accountNumber">
          <label>Informacje o płatności:</label>
          <p>{{info.accountNumber}}</p>
        </div>
      </div>
    </b-card-body>
    <b-card-footer class="text-right footer-style p-0" v-if="isAdmin">
      <b-button
        class="ml-2 btn-outline-secondary"
        type="button"
        variant="light"
        @click="openEditing()"
        data-toggle="tooltip"
        data-placement="auto"
        v-b-tooltip.hover
        title="Edytuj"
        size="sm"
      >
        <i class="fas fa-edit fa-fw"></i>
        <span>Edytuj</span>
      </b-button>
    </b-card-footer>
  </b-card>
</template>
<script>
import Wizard from "@/components/wizard.vue";

export default {
  props: {
    wizardStage: Number,
    info: Object,
    isAdmin: Boolean,
    isEditing: Boolean
  },
  methods: {
    openEditing() {
      this.$emit("openEditing");
    }
  },
  components: {
    Wizard
  }
};
</script>
<style scoped>
.footer-style {
  background-color: #fff;
  border: none;
}
.pt-5px {
  padding-top: 5px;
}
p {
  margin: 0;
}
</style>


