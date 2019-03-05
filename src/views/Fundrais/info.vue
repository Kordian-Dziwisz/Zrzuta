<template>
  <div class="ProjectInfo container">
    <p class="border-bottom">Utworzył: {{info.creator}}</p>
    <p class="border-bottom">
      Tytuł:
      {{info.title}}
    </p>
    <p class="border-bottom">Opis:
      <br>
      {{info.description}}
    </p>
    <p class="border-bottom">
      Zbiórka rozpoczęła się:
      <strong>
        {{ info.creationDate | moment("dddd, D, MMMM, YYYY")}}
        - {{ info.creationDate | moment("H:mm")}}
      </strong>
    </p>
    <label class="border-bottom">
      Zbiórka kończy się:
      <strong>{{ info.endDate | moment("dddd, D, MMMM, YYYY")}} - {{ info.endDate | moment("H:mm")}}</strong>
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