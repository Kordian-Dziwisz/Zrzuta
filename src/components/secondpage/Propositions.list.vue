<template>
    <div class="ListOfPropositions">
        here add a new Proposition
        <input type="number" v-model="newItem.number">
        <input type="text" v-model="newItem.name">
        <input type="number" v-model="newItem.price">
        <button @click="addNewItem">add new item</button>
        <ul>
            <p v-if="list.length==0">List is empty</p>
            <li v-for="(item, index) in list" :key="index">
                <!-- create a new componen to display item -->
                <Item
                    :item="{index: index, ...item}"
                    @like="likeItem"
                    @dislike="dislikeItem"
                    @remove="removeItem"
                />
            </li>
        </ul>
    </div>
</template>
<script>
import Item from "@/components/secondpage/Propositions.list.item.vue";

export default {
    props: {
        list: Array
    },
    data() {
        return {
            newItem: {
                creator: "",
                accepted: false,
                number: 0,
                name: "",
                price: 0.0,
                likes: [],
                dislikes: []
            }
        };
    },
    watch: {
        newItem() {
            console.log(newItem);
        },
        list() {
            this.$emit("list", this.list);
        }
    },
    methods: {
        addNewItem() {
            this.list.push({ ...this.newItem });
            this.newItem.number = 0;
            this.newItem.name = "";
            this.newItem.price = 0.0;
        },
        removeItem(index) {
            this.list.splice(index, 1);
        },
        likeItem(index) {
            this.list[index].likes.push(localStorage.getItem("login"));
        },
        dislikeItem(index) {
            this.list[index].dislikes.push(localStorage.getItem("login"));
        },
        // acceptItem(index) {
        //     this.list[index].accepted = true;
        //     this.$emit("list", this.list);
        // },
        authenticate(login) {
            //TODO
        }
    },
    created() {
        this.newItem.creator = localStorage.getItem("login");
    },
    components: {
        Item
    }
};
</script>

