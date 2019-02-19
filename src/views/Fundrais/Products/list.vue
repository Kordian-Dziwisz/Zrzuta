<template>
    <div class="ListOfProducts">
        <div v-if="admin">
            <p>here add a new product</p>
            <input type="number" v-model="newItem.number" @keypress.enter="addNewItem">
            <input type="text" v-model="newItem.name" @keypress.enter="addNewItem">
            <input type="number" v-model="newItem.price" @keypress.enter="addNewItem">
            <button @click="addNewItem">add new item</button>
        </div>
        <!-- displaying a list of Participant, create new component to Item bind -->
        <ul>
            <p v-if="list.length==0">List is empty</p>
            <li v-for="(item, index) in list" :key="index">
                <Item
                    v-if="!admin"
                    :item="{index: index, ...item}"
                    @number="setNumber"
                    @name="setName"
                    @price="setPrice"
                    @remove="removeItem"
                />
                <item-admin
                    v-else
                    :item="{index: index, ...item}"
                    @number="setNumber"
                    @name="setName"
                    @price="setPrice"
                    @remove="removeItem"
                />
            </li>
        </ul>
    </div>
</template>
<script>
import Item from "@/views/Fundrais/Products/item.vue";
import ItemAdmin from "@/views/Fundrais/Products/item.admin.vue";

export default {
    props: {
        list: Array,
        admin: false
    },
    data() {
        return {
            newItem: {
                number: 0,
                name: "",
                price: 0.0
            }
        };
    },
    watch: {
        list() {
            //problem with new item emmiting
            this.$emit("list", this.list);
        }
    },
    methods: {
        addNewItem() {
            if (this.newItem.name.length == 0) {
                alert("name field can't be empty");
            } else {
                this.list.push({ ...this.newItem });
                this.newItem.number = 0;
                this.newItem.name = "";
                this.newItem.price = 0.0;
            }
        },
        setNumber(index) {
            let tmp = 0;
            do {
                tmp = parseInt(prompt("set new number"));
            } while (typeof tmp != "number" || tmp <= 0);
            if (tmp > 0) {
                this.list[index].number = tmp;
            }
        },
        setName(index) {
            let tmp = "";
            do {
                tmp = prompt("set new name");
            } while (tmp.length == 0);
            if (tmp.length > 0) {
                this.list[index].name = tmp;
            }
        },
        setPrice(index) {
            let tmp = 0;
            do {
                tmp = parseFloat(prompt("set new price"));
            } while (typeof tmp != "number" || tmp <= 0);
            if (typeof tmp == "number") {
                this.list[index].price = tmp;
            }
        },
        removeItem(index) {
            this.list.splice(index, 1);
        }
    },
    components: {
        Item,
        ItemAdmin
    }
};
</script>

