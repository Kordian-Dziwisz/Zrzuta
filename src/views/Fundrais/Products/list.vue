<template>
    <div class="ListOfProducts">
        here add a new Product:
        <input
            type="number"
            v-model="newItem.number"
            @keypress.enter="addNewItem"
        >
        <input type="text" v-model="newItem.name" @keypress.enter="addNewItem">
        <input type="number" v-model="newItem.price" @keypress.enter="addNewItem">
        <button @click="addNewItem">add new item</button>

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
            console.log(this.admin);
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
            do {
                console.log(this.list[index].number);
                console.log(typeof this.list[index].number);
                this.list[index].number = parseInt(prompt("set new number"));
            } while (
                typeof this.list[index].number != "number" ||
                this.list[index].number <= 0
            );
        },
        setName(index) {
            this.list[index].name = prompt("new name");
        },
        setPrice(index) {
            do {
                this.list[index].price = parseFloat(prompt("set new price"));
            } while (
                typeof this.list[index].price != "number" ||
                this.list[index].price <= 0
            );
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

