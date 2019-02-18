<template>
    <div class="ProjectInfo">
        <p>Created by: {{projectData.creator}}</p>
        <p>Title: <input type="text" v-model="title"></p>
        <p>Desc: <br><textarea v-model="description"></textarea></p>
        <p>creationDate: {{projectData.endDate}}</p>
        <p>endDate: <input type="date" v-model="endDate"><input type="time" v-model="endTime"></p>
        {{endDate}}<br>
        {{endTime}}
    </div>
</template>
<script>
export default {
    props: {
        projectData: Object
    },
    data(){
        return{
            title: '',
            description: '',
            endTime: '',
            endDate: '',
        }
    },
    watch: {
        title(){
            this.returnObj();
        },
        description(){
            this.returnObj();
        },
        endDate(){
            this.returnObj();
        }
    },
    created(){
        this.title = this.projectData.title;
        this.description = this.projectData.description;
        let tmpDate = {...this.projectData.endDate};
        this.endTime = tmpDate.getHours() + ':' + tmpDate.getMinutes();
        this.endDate = tmpDate.getFullYear() + '-' + tmpDate.getMonths() + '-' + tmpDate.getDate();
    },
    methods: {

        //return
        returnObj(){
            //create enddate yyyy-mm-dd hh-mm
            let tmpDate = this.endDate.split('-');
            tmpDate.forEach(element => {
                console.log(element);
            });
            let tmpTime = this.endTime.split(':')
            tmpTime.forEach(element => {
                console.log(element);
            });
            //emit
            this.$emit('data', {
                title: this.title,
                description: this.description,
                endDate: new Date(tmpDate[0], tmpDate[1], tmpDate[2], tmpTime[0], tmpTime[1])
            });
        }
    },
}
</script>
<style scoped>

</style>