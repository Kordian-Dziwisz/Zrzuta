<template>
  <b-card class="border rounded">
    <!-- <b-card-header class="w-100 shadow-sm">Informacje o zbiórce</b-card-header> -->
    <b-card-body>
      <b-card-title class="mb-0 border-bottom">
        <div class="row">
          <div class="col">
            <h3>{{info.title}}&nbsp;</h3>
          </div>
          <div class="mb-0 col text-right">
            <h3 class="text-danger" v-if="info.ended">Zbiórka jest zakończona</h3>
            <h3 class="text-success" v-else>Zbiórka jest w trakcie</h3>
          </div>
        </div>
      </b-card-title>

      <b-card-text>
        <div
          class="row py-2"
          :class="{'border-bottom': info.description.length || info.accountNumber}"
        >
          <div class="col">
            <label>Zbiórka rozpoczęła się:</label>
            <h5>{{ info.creationDate | moment("LLL")}}</h5>
          </div>
          <div class="col text-right">
            <label>Zbiórka kończy się:</label>
            <h5 class="text-danger">{{ info.endDate | moment("LLL")}}</h5>
          </div>
        </div>
        <div class="row py-2">
          <div class="col" v-if="info.description.length">
            <label>Opis:</label>
            <h5>{{info.description}}</h5>
          </div>
          <div class="col" v-if="info.accountNumber">
            <label>Informacje o płatności:</label>
            <h5 style>{{info.accountNumber}}</h5>
          </div>
        </div>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: {
    info: Object
  }
};
</script>
<style scoped>
h5 {
  white-space: pre-line;
}
</style>
