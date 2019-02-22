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
    <p>Zbiórka rozpoczęła się: {{ info.creationDate | moment("dddd, d, MMMM, YYYY")}} o godzinie: {{ info.creationDate | moment("h:mm")}}</p>
    <p>Zbiórka kończy się: {{ info.endDate | moment("dddd, d, MMMM, YYYY")}} o godzinie: {{ info.endDate | moment("h:mm")}}</p>
    <br>
    isEnded: {{info.ended}}
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  }
};
</script>