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
        isEnded: {{newInfo.ended}} endThis:
        <button @click="newInfo.ended = !newInfo.ended">END</button>
        here add your account number:
        <input type="number" v-model="newInfo.accountNumber">
    </div>
</template>
<script>
export default {
    props: {
        info: Object
    },
    data() {
        return {
            newInfo: {}
        };
    },
    watch: {
        title() {
            this.returnObj();
        },
        description() {
            this.returnObj();
        },
        endDate() {
            this.returnObj();
        }
    },
    mounted() {
        this.newInfo = { ...this.info };
    },
    methods: {
        //return
        returnObj() {
            //create enddate yyyy-mm-dd hh-mm

            //emit
            this.$emit("data", {
                creationDate: this.info.creationDate,
                accountNumber: this.accountNumber,
                title: this.title,
                description: this.description,
                creator: this.info.creator,
                ended: this.info.ended
            });
        }
    }
};
</script>