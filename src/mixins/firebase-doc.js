export const firebaseMixin = {
  data() {
    return {
      fundraises: {
        // firebase: import(firebase),

        doc: {
          info: {
            accountNumber: "",
            creator: "",
            title: "",
            description: "",
            creationDate: "", //new Date(Date.now()).toJSON(),
            endDate: "", //new Date(Date.now() + 86400000).toJSON(),
            stage: 1
          },
          participants: [],
          products: []
        },
        docID: "",

        get db() {
          if (this.firebase) {
            this.creationDate = new Date(Date.now()).toJSON();
            this.endDate = new Date(Date.now() + 86400000).toJSON();
            this.creator = localStorage.getItem("login");
            return this.docID
              ? this.firebase.firestore().collection("Zrzuty-develop")
              : this.firebase
                  .firestore()
                  .collection("Zrzuty-develop")
                  .doc(this.docID);
          } else {
            console.log(
              "firebase not imported, import it using import firebase from 'firebase' in your main component"
            );
          }
        },

        async addNew(title, description) {
          this.doc.info.title = title;
          this.doc.info.description = description;
          let newFundrais = await this.db.add(this.doc);
          await this.$router.push({
            name: "Fundrais",
            params: { id: newFundrais.id }
          });
        },

        async get(docID) {
          this.docID = null;
          let tmpDoc = await this.db.get({ source: "default" });
          //converting from JSON date format to object
          this.tmpDoc.info.creationDate = new Date(this.tmpDoc.info.creationDate);
          this.tmpDoc.info.endDate = new Date(this.tmpDoc.info.endDate);
          return tmpDoc;
        },

        async getList() {
          this.docID = null;
          return await this.db
            .get()
            .docs.map(item => this.mapItem(item))
            .filter(x => x != null);
        },
        mapItem(item) {
          if (
            this.isShared(
              Object.values(item.data().participants)
                .map(x => x.name)
                .concat(item.data().info.creator)
            )
          ) {
            return { ...item.data().info, id: item.id };
          } else return null;
        },
        isShared(list) {
          return list.includes(localStorage.getItem("login"));
        },

        async addNew(title) {
          this.docID = null;
          this.doc.info.title = title;
          let newFundrais = await this.db.add(this.doc);
          await this.$router.push({
            name: "Fundrais",
            params: { id: newFundrais.id }
          });
        },

        async update(docID) {
          this.docID = docID;
          await this.db.set(this.doc);
        },

        async update() {
          this.docID
            ? this.db.set(this.doc)
            : console.log("no docID detected, use update(docID) or set it using fundraises.docID = <String>");
        },
        async remove(docID) {
          this.docID = docID;
          await this.db.doc(docID).delete();
        }
      }
    };
  },
  created() {
    console.log("mixin activated");
    console.log(this.fundraises);
  }
};
