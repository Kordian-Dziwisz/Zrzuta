<template>
    <div class="input">
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
    .input {
        position: static;
        margin: 25vh 25vw;
        width: 50vw;
        height: 20vh;
        padding-top: 12vh;
        text-align: center;
        border: 2px solid #ccc;
        border-radius: 1vh;
        box-shadow: .5vw .5vw 1vh rgba(00, 00, 00, 50%);
    }
</style>

