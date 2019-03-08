<template>
  <div class="ProjectInfo container">
    <p class="border-bottom">Utworzył: {{info.creator}}</p>
    <p class="border-bottom">
      Tytuł:
      {{info.title}}
    </p>
    <p class="border-bottom" style="white-space: pre">Opis:</p>

    <p>{{info.description}}</p>

    <p class="border-bottom" v-if="info.creationDate">
      Zbiórka rozpoczęła się:
      <span class="font-weight-bold">
        {{ info.creationDate | moment("dddd, D, MMMM, YYYY")}}
        - {{ info.creationDate | moment("H:mm")}}
      </span>
    </p>
    <label class="border-bottom" v-if="info.endDate">
      Zbiórka kończy się:
      <span
        class="font-weight-bold text-danger"
      >{{ info.endDate | moment("dddd, D, MMMM, YYYY")}} - {{ info.endDate | moment("H:mm")}}</span>
    </label>
    <h4 v-if="info.ended">Zbiórka jest zakończona</h4>
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  }
};
</script>