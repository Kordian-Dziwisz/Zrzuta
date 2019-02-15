<template>
    <div class="ListOfParticipants">
        here add a new Participant <br>
        Add a new Participant: <input type="text" v-model="newItem" @keypress.enter="addNewItem()"><br>

        <ul>
            <li v-for="(item, index) in list"   :key="index">
                {{index}}: {{item}} |
                <button @click="removeItem(index)" v-if="authenticate(item)"> remove item </button>
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
            newItem: ''
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
            this.newItem = '';
        },
        removeItem(index){
            console.log(index);
            this.list.splice(index, 1);
        },
        authenticate(login){
            return localStorage.getItem('login') == login;
        }
    }
}
</script>
