<template>
  <div class="ProjectInfo">
    <p>Created by: {{info.creator}}</p>
    <p>
      Title:
      {{info.title}}
    </p>
    <p>Desc:
      <br>
      {{info.description}}
    </p>
    <p>
      Zbiórka rozpoczęła się:
      <strong>
        {{ info.creationDate | moment("dddd, D, MMMM, YYYY")}}
        - {{ info.creationDate | moment("H:mm")}}
      </strong>
    </p>
    <p>
      Zbiórka kończy się:
      <strong>{{ info.endDate | moment("dddd, D, MMMM, YYYY")}} - {{ info.endDate | moment("H:mm")}}</strong>
    </p>
    <br>
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