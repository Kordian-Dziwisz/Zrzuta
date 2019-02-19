<template>
    <div class="ParticipantsListItem">
        <!-- display properties -->
        {{item.index}}: {{item.number}} | {{item.name}} | {{item.price}} | {{(item.price * item.number).toFixed(2)}}
        <div class="control">
            <button @click="setNumber">setNumber</button>
            <button @click="setName">setName!</button>
            <button @click="setPrice">setPrice</button>
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
        setNumber() {
            this.$emit("number", this.item.index);
        },
        setName() {
            this.$emit("name", this.item.index);
        },
        setPrice() {
            this.$emit("price", this.item.index);
        },
        removeItem() {
            this.$emit("remove", this.item.index);
        }
    }
};
</script>
