<template>
  <div>
    <fundraising-list
      :list="list ? list : []"
      @remove="fundraises.remove()"
      @new="fundraises.addNew($event)"
    ></fundraising-list>
  </div>
</template>
<script>
import Vue from "vue";
import Login from "@/components/Login.vue";
import FundraisingList from "@/views/Home/list.vue";
import { firebase } from "firebase";
import { firebaseMixin } from "@/mixins/firebase-doc";

export default {
  mixins: [firebaseMixin],
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.list = this.fundraises.getList();
  },
  components: {
    Login,
    FundraisingList
  }
};
</script>
<style scoped>
div {
  word-break: break-all;
  word-break: break-word;
}
</style>