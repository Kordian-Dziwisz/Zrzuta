<template>
    <div class="main">
        <login @login="changeLogin" v-if="!logged"/>
        <fundraising-list v-if="logged" :list="list"></fundraising-list>
    </div>
</template>

<script>
import Vue from "vue";
import Login from "@/components/mainpage/Login.vue";
import FundraisingList from "@/components/mainpage/Fundraising.list.vue";
import firebase from "firebase";
// import List from '@/components/List.vue'

export default {
    data() {
        return {
            logged: false,
            login: "",
            list: [
                {
                    docID="uRLJNTchecAfASfPUKT5",
                    creator: "Kordian",
                    title: "title",
                    description: "Poor project",
                    creationDate: new Date("December 17, 1995 03:24:00"),
                    endDate: new Date("December 17, 1995 03:24:00"),
                    ended: false
                }
            ],
            db: firebase.firestore().collection("Zrzuty")
        };
    },
    mounted() {
        this.login = localStorage.getItem("login");
    },
    methods: {
        changeLogin(login) {
            if (login != "") {
                this.logged = true;
            }
            localStorage.setItem("login", login);
        }
    },
    components: {
        Login,
        FundraisingList
    }
};
</script>

