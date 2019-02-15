<template>
    <div class="SecondPage">
        <project-info :projectData="fundraisData"
        @data="updateProjectData($event)" />
        <list-of-participants :list="this.listOfParticipants" @list="updateParticipantsList($event)" />
        <list-of-products :list='this.listOfProducts' @list="this.listOfProducts" />
    </div>
</template>
<script>
//import from firebase and save in localStorage import firebase from 'firebase'
import ProjectInfo from '@/components/ProjectInfo.vue'
import ListOfParticipants from '@/components/ListOfParticipants.vue'
import ListOfProducts from '@/components/ListOfProducts.vue'

export default {
    data(){
        return{
            //ProjectInfo elements
            fundraisData: {
                creator: 'Kordian',
                title: 'title',
                description: 'Poor project',
                creationDate: new Date('December 17, 1995 03:24:00'),
                endDate: new Date('December 17, 1995 03:24:00')
            },
            //ListOfParticipants
            listOfParticipants: ['Michal'],
            listOfProducts: [
                {
                    number: 1,
                    name: 'Pizza',
                    price: 12.4,
                }
            ]
        }
    },
    methods: {
        updateParticipantsList(event){
            this.listOfParticipants = event;
            console.log(event);
        },
        updateProjectData(event){
            this.fundraisData = {...event};
            console.log(this.title);
            console.log(this.description);
            console.log(this.endDate);
        },
        updateListOfProducts(event){
            this.listOfProducts = event;
        }
    },
    components: {
        ProjectInfo,
        ListOfParticipants,
        ListOfProducts
    }
}
</script>
