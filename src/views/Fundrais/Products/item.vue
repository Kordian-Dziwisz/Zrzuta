<template>
    <div class="ParticipantsListItem">
        <!-- display properties -->
        {{item.index}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}}
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    }
};
</script>
