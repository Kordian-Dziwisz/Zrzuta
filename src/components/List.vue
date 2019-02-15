<template>
    <div id="List">
        <ul>
            <li v-for="(element, i) in list" :key="i">{{element}}</li>
        </ul>
    </div>
</template>
<script>
import firebase from 'firebase'
//to change, component shouldn't access db
export default {
    data(){
        return {
            list: [],
            db: firebase.firestore().collection('Zrzuty'),
        }
    },
    mounted(){
        //this.getList();
        this.setSmth();
    },
    // methods: {
    //     //async getList(){
    //     //    this.list = (await this.db.get()).docs.map(item => this.mapItem(item));
    //     //},
    //     //mapItem(){
    //     //    return {...item.creators}
    //     //},
    //     setSmth(){
    //         this.db.doc('Pizza')
    //             .update({newtest: 'new msg'})
    //             .then(console.log("didIt")
    //             .catch(error => {console.log('error writing doc: ' + error)});
    //     }
    // }
}
</script>

