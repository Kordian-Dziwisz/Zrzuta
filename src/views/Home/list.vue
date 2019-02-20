<template>
    <div class="FundraisingList">
        <h1>List of fundraises</h1>
        <ul>
            <p v-if="list.length == 0">Brak aktywnych zbiórek</p>
            <li v-for="(item, index) in list" :key="index">
                <Item :item="{index: index, ...item}" @remove="removeItem"/>
            </li>
        </ul>
    </div>
</template>

<script>
import Item from "@/views/Home/item.vue";
export default {
    props: {
        list: Array
    },
    methods: {
        removeItem(event) {
            this.list.splice(event.index, 1);
            this.$emit("remove", event.id);
        }
    },
    components: {
        Item
    }
};
</script>