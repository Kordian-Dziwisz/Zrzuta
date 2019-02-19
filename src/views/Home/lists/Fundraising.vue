<template>
    <div class="FundraisingList">
        <h1>List of fundraises</h1>
        <br>add a new item:
        <input type="text" v-model="newItem.title" @keypress.enter="addNewItem">
        <button @click="addNewItem"></button>
        <ul>
            <p v-if="list.length == 0">Brak aktywnych zbiórek</p>
            <li v-for="(item, index) in list" :key="index">
                <Item :item="{index: index, ...item}" @remove="removeItem" @edit="editItem"/>
            </li>
        </ul>
    </div>
</template>

<script>
import Item from "@/components/mainpage/Fundraising.list.item.vue";
export default {
    props: {
        list: Array
    },
    data() {
        return {
            newItem: {
                accountNumber: "",
                creator: "",
                title: "",
                description: "",
                creationDate: new Date("December 17, 1995 03:24:00"),
                endDate: new Date("December 17, 1995 03:24:00"),
                ended: false
            }
        };
    },
    methods: {
        addNewItem() {
            this.list.push({ ...this.newItem });
            this.$emit("add", { ...this.newItem });
            this.newItem.title = "";
        },
        editItem() {
            console.log("editing item");
        },
        removeItem(index) {
            this.list.splice(index, 1);
        }
    },
    created() {
        this.newItem.creator = localStorage.getItem("login");
        this.newItem.creationDate = Date.now();
    },
    components: {
        Item
    }
};
</script>