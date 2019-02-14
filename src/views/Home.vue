<template>
  <div class="home container">
    {{list}}
    <span v-if="list.length == 0">Brak zrzut</span>
    <table v-else class="table">
      <thead>
        <tr>
          <th>Nazwa zrzuty</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.id}} {{item.name}}</td>
          <td>
            <button @click="deleteDoc(item)">usuń</button>
          </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <h3>Dodaj zrzutę</h3>
    <form @submit.prevent="add()">
      <label>Podaj nazwę zrzuty</label>
      <input v-model="form.name">
      <button type="submit">zapisz</button>
    </form>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {},
      db: firebase.firestore().collection("test"),
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let test = this.db.get();

      this.list = (await this.db.get()).docs.map(item => this.mapItem(item));
    },
    mapItem(item) {
      return { ...item.data(), ...{ id: item.id } };
    },
    async deleteDoc(doc) {
      await this.db.doc(doc.id).delete();

      let index = this.list.indexOf(doc);
      if (index != -1) {
        this.list.splice(index, 1);
      }
    },
    async add() {
      let result = await this.db.add({
        name: this.form.name
      });

      this.list.push(this.mapItem(await result.get()));
    }
  }
};
</script>