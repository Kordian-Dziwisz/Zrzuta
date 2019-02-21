<template>
    <div>
        <span>
            {{item.index}}: {{item.title}} | {{item.creator}} | {{item.description}} |
            Zbiórka kończy się: {{ item.endDate | moment("dddd, MMMM, YYYY")}} o godzinie: {{ item.endDate | moment("h:mm")}}
        </span>
        <button @click="removeItem" v-if="isYour">removeMe!</button>
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
    created() {
        this.item.creationDate = new Date(
            this.item.creationDate.seconds * 1000
        );
        this.item.endDate = new Date(this.item.endDate.seconds * 1000);
    },
    computed: {
        isYour() {
            return this.item.creator == localStorage.getItem("login");
        }
    }
};
</script>
