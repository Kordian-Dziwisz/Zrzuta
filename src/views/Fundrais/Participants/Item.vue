<template>
  <div class="border rounded">
    <b-card-header class="p-1" :class="{'paidBar': item.paid, 'acceptedBar': item.accepted}">
      <div class="row">
        <div class="col">
          <h5 class="d-lg-inline">{{item.name}}</h5>
          <h6 v-if="item.accepted">Zapłacono</h6>
          <h6 v-else-if="item.paid">Wpłacono</h6>
        </div>
        <div class="col text-right">
          <b-button
            class="btn-outline-success btn-light mr-1"
            size="sm"
            data-placement="auto"
            v-b-tooltip.hover
            title="Zapłacone"
            v-if="!item.accepted && isEnded && isAdmin"
            @click="accept"
          >
            <i class="fas fa-vote-yea pr-1"></i>
            <span class="d-none d-lg-inline">Zapłacił/a</span>
          </b-button>
          <b-button
            class="btn-outline-primary btn-light"
            size="sm"
            data-toggle="tooltip"
            data-placement="auto"
            v-b-tooltip.hover
            title="Zapłacone"
            v-if="isAuthenticated && !item.paid && !item.accepted && isEnded && !isAdmin"
            @click="pay"
          >
            <i class="fas fa-vote-yea fa-fw"></i>
            <span class="d-none d-lg-inline">Wpłaciłem/am</span>
          </b-button>
          <b-button
            class="btn-outline-danger btn-light"
            size="sm"
            data-toggle="tooltip"
            data-placement="auto"
            v-b-tooltip.hover
            title="Usuń"
            v-if="(isAdmin || isAuthenticated) && !isEnded"
            @click="showModal = true"
          >
            <i class="fas fa-trash-alt fa-fw"></i>
            <span class="d-none d-lg-inline"></span>
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body v-if="item.comment.length>0 || isAuthenticated" class="py-3">
      <div v-if="isAuthenticated">
        <label>Twój komentarz:</label>
        <b-form-textarea
          rows="0"
          max-rows="6"
          maxlength="400"
          v-model.trim="item.comment"
          placeholder="Tutaj wpisz swój komentarz"
        ></b-form-textarea>
        <div class="text-right">
          <b-button
            @click="saveComment"
            size="sm"
            data-placement="auto"
            v-b-tooltip.hover
            title="Zapisz"
            variant="light"
            class="my-1 btn-outline-success text-right"
          >Zapisz</b-button>
        </div>
      </div>
      <div v-else-if="item.comment.length > 50 && !commentShow">
        <h6 class="d-inline">{{ellipsis(item.comment, 50).slice(0, -3)}}</h6>
        <b-button
          class="d-inline btn-light mx-1"
          @click="commentShow=!commentShow"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Pokaż więcej"
        >...</b-button>
      </div>
      <div v-else-if="item.comment.length > 50">
        <h6 class="d-inline">{{item.comment}}</h6>
        <b-button
          class="d-inline text-dark btn-light mx-1"
          @click="commentShow=!commentShow"
          size="sm"
          data-toggle="tooltip"
          data-placement="auto"
          v-b-tooltip.hover
          title="Ukryj"
        >...</b-button>
      </div>
      <div v-else>
        <h6>{{item.comment}}</h6>
      </div>
      <!-- <button onclick="showItem.comment">
          <span class="buttontext"></span>
      </button>-->
    </b-card-body>
  </div>
</template>
<script>
export default {
  data() {
    return {
      click: false,
      showModal: false,
      ellipsis: require("text-ellipsis"),
      commentShow: false
    };
  },
  props: {
    item: Object,
    isEnded: false,
    isAdmin: false
  },
  methods: {
    pay() {
      if (this.item.accepted == false) {
        this.item.paid = true;
      }
      this.update();
      this.$forceUpdate();
    },
    accept() {
      this.item.accepted = true;
      this.update();
      this.$forceUpdate();
    },
    remove() {
      this.$emit("remove", this.item.index);
      this.showModal = false;
    },
    update() {
      this.$emit("update", this.item);
    },
    saveComment() {
      this.$notify({
        group: "status",
        title: "Status",
        text: "Komentarz został zapisany",
        type: "success"
      });
      this.update();
    }
  },
  computed: {
    isAuthenticated() {
      return this.item.name == localStorage.getItem("login");
    }
  }
};
</script>
<style scoped>
h6 {
  white-space: pre-line;
  font-weight: 400;
}
.acceptedBar {
  border-left: 6px solid #28a745 !important;
  box-sizing: border-box;
}
.paidBar {
  border-left: 6px solid #007bff;
  box-sizing: border-box;
}
.text-overflow-ellipsis {
  background: transparent;
  border: none !important;
  padding: 15px;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

