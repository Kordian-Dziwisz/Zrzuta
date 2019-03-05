<template>
  <div
    class="ParticipantsListItem"
  >{{item.index + 1}}: {{item.number + " szt"}} | {{item.name}} | {{item.price + " zł"}} | {{(item.price * item.number).toFixed(2) + " zł"}}</div>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
