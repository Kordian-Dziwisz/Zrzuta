<template>
    <div class="main">
        <login @login='changeLogin' v-if="!logged" />
        <p>{{login}}</p>
        <!-- <List /> -->
    </div>
</template>

<script>
import Vue from 'vue'
import Login from '@/components/Login.vue'

// import List from '@/components/List.vue'

export default {
    data(){
        return{
            logged: false,
            login: '',
            placeholder: 12
        }
    },
    methods: {
        changeLogin(login){
            this.logged = true;
            localStorage.setItem('login', login);
            this.login = localStorage.getItem('login');
        }
    },
    components: {
        Input
        //List
    }
}
</script>

