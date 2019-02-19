<template>
    <div class="ParticipantsListItem">
        {{item.index}}: {{item.name}} | {{item.comment}} | {{item.paid}} | {{item.accepted}}
        <div class="control">
            <button @click="setAccepted">Accepted</button>
            <button @click="removeItem">removeMe!</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    methods: {
        setAccepted() {
            if (this.item.paid == true) {
                this.$emit("accepted", this.item.index);
            }
        },
        removeItem() {
            this.$emit("remove", this.item.index);
        }
    }
};
</script>
