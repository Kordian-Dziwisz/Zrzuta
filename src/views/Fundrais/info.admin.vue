<template>
    <div class="ProjectInfo">
        <p>Created by: {{info.creator}}</p>
        <p>
            Title:
            <input type="text" v-model="title">
        </p>
        <p>Desc:
            <br>
            <textarea v-model="description"></textarea>
        </p>
        <p>creationDate: {{info.endDate}}</p>
        <p>
            endDate:
            <input type="date" v-model="endDate">
            <input type="time" v-model="endTime">
        </p>
        {{endDate}}
        <br>
        {{endTime}}
        <br>
        isEnded: {{info.ended}}
        here add your account number:
        <input
            type="number"
            v-model="accountNumber"
        >
    </div>
</template>
<script>
export default {
    props: {
        info: Object
    },
    data() {
        return {
            accountNumber: "",
            title: "",
            description: "",
            endTime: "",
            endDate: ""
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
    created() {
        this.title = this.info.title;
        this.description = this.info.description;
        let tmpDate = { ...this.info.endDate };
        this.endTime = tmpDate.getHours() + ":" + tmpDate.getMinutes();
        this.endDate =
            tmpDate.getFullYear() +
            "-" +
            tmpDate.getMonths() +
            "-" +
            tmpDate.getDate();
    },
    methods: {
        //return
        returnObj() {
            //create enddate yyyy-mm-dd hh-mm
            let tmpDate = this.endDate.split("-");
            tmpDate.forEach(element => {
                console.log(element);
            });
            let tmpTime = this.endTime.split(":");
            tmpTime.forEach(element => {
                console.log(element);
            });
            //emit
            this.$emit("data", {
                accountNumber: this.accountNumber,
                title: this.title,
                description: this.description,
                endDate: new Date(
                    tmpDate[0],
                    tmpDate[1],
                    tmpDate[2],
                    tmpTime[0],
                    tmpTime[1]
                )
            });
        }
    }
};
</script>