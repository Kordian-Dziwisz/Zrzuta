<template>
    <div class="ProjectInfo">
        <p>Created by: {{info.creator}}</p>
        <p>
            Title:
            <input type="text" v-model="newInfo.title">
        </p>
        <p>Desc:
            <br>
            <textarea v-model="newInfo.description"></textarea>
        </p>
        <p>creationDate: {{info.creationDate}}</p>
        <br>
        <p>endDate: {{newInfo.creationDate}}</p>
        <datepicker></datepicker>
        isEnded: {{newInfo.ended}} endThis:
        <button @click="newInfo.ended = !newInfo.ended">END</button>
        here add your account number:
        <input type="text" v-model="newInfo.accountNumber">
    </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
export default {
    props: {
        info: Object
    },
    data() {
        return {
            newInfo: Object
        };
    },
    watch: {
        newInfo() {
            this.returnObj();
        }
    },
    updated() {
        this.newInfo = this.info;
    },
    methods: {
        //return
        returnObj() {
            //create enddate yyyy-mm-dd hh-mm

            //emit
            this.$emit("data", this.newInfo);
        }
    },
    components: {
        Datepicker
    }
};
</script>