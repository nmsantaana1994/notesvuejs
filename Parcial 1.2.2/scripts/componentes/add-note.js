Vue.component("add-note", {
  data: function () {
    return {
      contenido: "",
      titulo: "",
    };
  },
  template: `
  <div class="input-group">
    <input v-model="titulo" type="text" class="form-control" placeholder="Titulo" aria-label="Add Note" aria-describedby="button-addon" @keypress.enter="addNote">
    <input v-model="contenido" type="text" class="form-control" placeholder="Add Note" aria-label="Add Note" aria-describedby="button-addon" @keypress.enter="addNote">
    <button :disabled="contenido==''" class="btn btn-outline-secondary" type="button" id="button-addon" @click="addNote" @keypress.enter="addNote">Add</button>
  </div>`,

  methods: {
    addNote: function () {
      if (this.contenido == ""){
        return false;
      }

      this.$emit("new-note", {
        contenido: this.contenido, 
        titulo: this.titulo,
        date: new Date(),
      });
      this.contenido = "";
      this.titulo = "";
    },
  },
});
