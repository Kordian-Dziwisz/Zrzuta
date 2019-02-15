<template>
    <div class="Login">
        <label>Login Panel</label><br>
            <input @keydown.enter="returnLogin" v-model="login" placeholder="your login">
    </div>
</template>
<script>

export default {
    data(){
        return{
            login: ''
        }
    },
    created(){
        this.login = localStorage.getItem("login");
    },
    methods: {
        returnLogin(){
            this.$emit('login', this.login)
        }
    },
}
</script>
<style scoped>
</style>

