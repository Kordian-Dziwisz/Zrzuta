<template>
    <div class="FundraisingListItem">
        {{item.index}}: {{item.title}} | {{item.creator}} | {{item.description}} | {{item.endDate}}
        <button
            v-if="authenticate"
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
            this.$emit("remove", this.item.index);
        },
        authenticate() {
            if (this.item.creator == localStorage.getItem("login")) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>
