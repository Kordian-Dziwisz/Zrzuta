<template>
    <div class="main">
        <login @login="changeLogin" v-if="!logged"/>
        <fundraising-list v-if="logged" :list="list" @add="addFundrais"></fundraising-list>
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
            db: firebase.firestore().collection("Zrzuty"),
            list: [
                {
                    id: "uRLJNTchecAfASfPUKT5",
                    creator: "Kordian",
                    title: "title",
                    description: "Poor project",
                    creationDate: new Date("December 17, 1995 03:24:00"),
                    endDate: new Date("December 17, 1995 03:24:00"),
                    ended: false
                }
            ]
        };
    },
    mounted() {
        this.login = localStorage.getItem("login");
        this.getList();
    },
    methods: {
        changeLogin(login) {
            if (login != "") {
                this.logged = true;
            }
            localStorage.setItem("login", login);
        },
        async getList() {
            this.list = (await this.db.get()).docs.map(item =>
                this.mapItem(item)
            );
            console.log(this.list);
        },
        async addFundrais(event) {
            await this.db.add({ fundraisInfo: { ...event } });
        },
        async removeFundrais(event) {
            this.db.doc(event.id).delete();
        },
        mapItem(item) {
            return { ...item.data().fundraisInfo, id: item.id };
        }
    }
};
</script>
<style scoped>
.main {
    padding-top: 80px;
}
</style>


