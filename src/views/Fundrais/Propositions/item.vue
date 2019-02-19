<template>
    <div class="ParticipantsListItem">
        <!-- display properties index:creator:number|name|price|totalcost -->
        {{item.index}}: {{item.creator}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}} | {{item.likes.length}} | {{item.dislikes.length}}
        <div class="control">
            <button @click="likeItem" v-if="!authenticate">like</button>
            <button @click="dislikeItem" v-if="!authenticate">dislike</button>
            <button @click="removeItem" v-if="authenticate">removeMe!</button>
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
        acceptItem() {
            this.$emit("accept", this.item.index);
        }
    },
    computed: {
        authenticate() {
            return this.item.creator != localStorage.getItem("login");
        }
    }
};
</script>
