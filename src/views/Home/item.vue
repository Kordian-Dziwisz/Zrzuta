<template>
    <div>
        {{item.index}}: {{item.title}} | {{item.creator}} | {{item.description}} | {{item.endDate}}
        <button
            @click="removeItem"
        >removeMe!</button>
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}">Edit</router-link>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    methods: {
        editItem() {
            this.$emit("edit", this.item.index);
        },
        removeItem() {
            this.$emit("remove", {
                index: this.item.index,
                id: this.item.id
            });
        }
    }
};
</script>
