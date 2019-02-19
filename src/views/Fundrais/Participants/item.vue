<template>
    <div class="ParticipantsListItem">
        {{item.index}}: {{item.name}} | {{item.comment}} | {{item.paid}} | {{item.accepted}}
        <div class="control">
            <button @click="setComment" v-if="you">Comment</button>
            <button @click="setPaid" v-if="you">Paid</button>
            <button @click="removeItem" v-if="you">removeMe!</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        you: false
    },
    methods: {
        setComment() {
            this.$emit("comment", this.item.index);
        },
        setPaid() {
            if (this.item.accepted == false) {
                this.$emit("paid", this.item.index);
            }
        },
        removeItem() {
            this.$emit("remove", this.item.index);
        }
    }
};
</script>
