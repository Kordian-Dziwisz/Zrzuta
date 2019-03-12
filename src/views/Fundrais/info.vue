<template>
  <b-card-group>
    <b-card-header class="w-100">
      <strong>Informacje o projekcie</strong>
    </b-card-header>
    <b-card>
      <b-card-body class="w-100">
        <b-card-title class="mb-0 border-bottom align-middle">
          <b-row>
            <b-col>
              <h2 class="d-inline">{{info.title}}&nbsp;</h2>
              <!-- <h5 class="font-weight-light d-inline">stworzona przez:&nbsp;</h5>
              <h5 class="d-inline">{{info.creator}}</h5>-->
            </b-col>
            <b-col class="text-right">
              <h4 class="d-inline text-danger" v-if="info.ended">Zbiórka jest zakończona</h4>
              <h4 class="d-inline text-success" v-else>Zbiórka jest w trakcie</h4>
            </b-col>
          </b-row>
        </b-card-title>

        <b-card-text>
          <b-row
            class="py-2"
            :class="{'border-bottom': info.description.length || info.accountNumber}"
          >
            <b-col>
              <label>Zbiórka rozpoczęła się:</label>
              <h5>{{ info.creationDate | moment("LLL")}}</h5>
            </b-col>
            <b-col class="text-right">
              <label>Zbiórka kończy się:</label>
              <h5 class="text-danger">{{ info.endDate | moment("LLL")}}</h5>
            </b-col>
          </b-row>
          <b-row
            class="py-2"
            :class="{'border-bottom': info.description.length || info.accountNumber}"
          >
            <b-col v-if="info.description.length">
              <label>Opis:</label>
              <h5 style="white-space: pre">{{info.description}}</h5>
            </b-col>
            <b-col v-if="info.accountNumber">
              <label>Informacje o płatności:</label>
              <h5 style="white-space: pre">{{info.accountNumber}}</h5>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card-body>
    </b-card>
  </b-card-group>
</template>
<script>
export default {
  props: {
    info: Object
  }
};
</script>