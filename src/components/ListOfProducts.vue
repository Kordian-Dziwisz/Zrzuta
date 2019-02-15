<template>
    <div class="ListOfProducts">
        here add a new Product
        <input type="number" v-model="newItem.number">
        <input type="text" v-model="newItem.name">
        <input type="number" v-model="newItem.price">
        <button @click="addNewItem">add new item</button>
        <ul>
            <li v-for="(item, index) in list"   :key="index">
                {{item.number}} | {{item.name}} | {{item.price}} | {{item.price * item.number}}
                <button @click="removeItem(index)"> remove item </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        list: Array
    },
    data(){
        return{
            newItem: {
                number: 0,
                name: '',
                price: .0
            }
        }
    },
    watch: {
        list(){
            this.$emit('list', this.list);
        }
    },
    methods: {
        addNewItem(){
            this.list.push(this.newItem);
            this.newItem = {
                number: 0,
                name: '',
                price: .0
            };
        },
        removeItem(index){
            console.log(index);
            this.list.splice(index, 1);
        },
        authenticate(login){
            //TODO
        }
    }
}
</script>

