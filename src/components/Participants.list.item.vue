<template>
    <div class="ParticipantsListItem">
        {{item.index}}: {{item.name}} | {{item.comment}} | {{item.paid}} | {{item.accepted}}
        <div class="control" v-if="authenticate(item.name)">
            <button @click="setComment">Comment</button>
            <button @click="setPaid">Paid</button>
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
        setComment() {
            this.$emit("comment", this.item.index);
        },
        setPaid() {
            this.$emit("paid", this.item.index);
        },
        setAccepted() {
            this.$emit("accepted", this.item.index);
        },
        removeItem() {
            this.$emit("remove", this.item.index);
        },
        authenticate(login) {
            return localStorage.getItem("login") == login;
        }
    }
};
</script>
