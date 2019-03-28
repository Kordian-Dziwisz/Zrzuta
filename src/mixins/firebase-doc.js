export const firebaseMixin = {
  data() {
    return {
      fundraises: {
        doc: {
          info: {
            accountNumber: "",
            creator: localStorage.getItem("login"),
            title: "",
            description: "",
            creationDate: new Date(Date.now()).toJSON(),
            endDate: new Date(Date.now() + 86400000).toJSON(),
            isEnded: false
          },
          participants: [],
          products: []
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

        async addNew(title) {
          this.doc.info.title = title;
          let newFundrais = await this.db.add(this.doc);
          await this.$router.push({
            name: "Fundrais",
            params: { id: newFundrais.id }
          });
        },

        async update(docID) {
          if ( this.fundraises.info.endDate.getYear() > 118 && this.fundraises.info.title.length > 0 ){
            await this.db.set(this.doc)
            }
          },
        },

        async update() {
          if (this.fundraises.info.endDate.getYear() > 118 && this.fundraises.info.title.length > 0) {
            this.docID
              ? this.db.set(this.doc)
              : console.log("no docID detected, use update(docID) or set it using fundraises.docID = <String>");
            }
      },

          async remove( docID )
          {
            await this.db.doc(odcID).delete();

      },

        docID: "",
        get db() {
          return this.docID
            ? firebase.firestore().collection("Zrzuty-develop")
            : firebase
                .firestore()
                .collection("Zrzuty-develop")
                .doc(this.docID);
        }
      }
    };
  }
};
