<template>
    <div>
        {{item.index}}: {{item.title}} | {{item.creator}} | {{item.description}} | {{item.endDate}}
        <button
            @click="removeItem"
            v-if="isYour"
        >removeMe!</button>
        <router-link
            :to="{name: 'Fundrais', params: {id: item.id}}"
            @click="removeItem"
            v-if="isYour"
        >Edit</router-link>
        <router-link :to="{name: 'Fundrais', params: {id: item.id}}" @click="removeItem" v-else>Show</router-link>
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
    },
    computed: {
        isYour() {
            return this.item.creator == localStorage.getItem("login");
        }
    }
};
</script>
