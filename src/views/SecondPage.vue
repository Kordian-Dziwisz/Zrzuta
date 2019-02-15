<template>
    <div class="SecondPage">
        <project-info :projectData="fundraisData"
        @data="updateProjectData($event)" />
        <list-of-participants :list="listOfParticipants" @list="updateParticipantsList($event)" />
        <list-of-products :list='listOfProducts' @list="updateListOfProducts()" />
        <list-of-propositions :list="listOfPropositions" @list="updateListOfPropositions()"/>
    </div>
</template>
<script>
//import from firebase and save in localStorage import firebase from 'firebase'
import ProjectInfo from '@/components/ProjectInfo.vue'
import ListOfParticipants from '@/components/ListOfParticipants.vue'
import ListOfProducts from '@/components/ListOfProducts.vue'
import ListOfPropositions from '@/components/ListOfPropositions.vue'

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
            //TODO ListOfParticipants should be a proper arr of obj with Name, Comment, paid, accepted
            listOfParticipants: ['Michal'],
            listOfProducts: [
                {
                    number: 1,
                    name: 'Pizza',
                    price: 12.4,
                }
            ],
            listOfPropositions: [
                {
                    creator: 'Kordian',
                    accepted: false,
                    number: 1,
                    name: 'Pizza',
                    price: 12.4,
                    likes: 0,
                    dislikes: 0,
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
        },
        updateListOfPropositions(event){
            this.listOfPropositions = event;
            this.listOfPropositions.forEach(item => (acceptProposition(item)));
        },
        acceptProposition(item){
            if (item.accepted) {
                delete item.creator;
                delete item.likes;
                delete item.dislikes;
                delete item.accepted;
                this.listOfProducts.push(item);
                delete listOfPropositions.indexOf(item);
            }
        }
    },
    components: {
        ProjectInfo,
        ListOfParticipants,
        ListOfProducts,
        ListOfPropositions
    }
}
</script>
