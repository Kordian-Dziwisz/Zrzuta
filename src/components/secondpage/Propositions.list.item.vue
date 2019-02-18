<template>
    <div class="ParticipantsListItem">
        <!-- display properties index:creator:number|name|price|totalcost -->
        {{item.index}}: {{item.creator}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}} | {{item.likes.length}} | {{item.dislikes.length}}
        <div class="control">
            <button @click="likeItem">like</button>
            <button @click="dislikeItem">dislike</button>
            <button v-if="authenticate" @click="removeItem">removeMe!</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    methods: {
        likeItem() {
            this.$emit("like", this.item.index);
        },
        dislikeItem() {
            this.$emit("dislike", this.item.index);
        },
        removeItem() {
            this.$emit("remove", this.item.index);
        },
        authenticate() {
            return localStorage.getItem("login") == this.item.creator;
        }
    }
};
</script>
