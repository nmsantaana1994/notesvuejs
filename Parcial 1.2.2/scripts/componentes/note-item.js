Vue.component("note-item", {
  props: ["note","id"],
  data: function () {
    return {
      status: false,
      titulo: "",
      contenido: "",
    };
  },

  mounted() {
    this.status = this.note.status;
    this.titulo = this.note.titulo;
    this.contenido = this.note.contenido;
  },

  template: `
  <div class="post-it d-inline-block mx-3" :class="note.background">
    <div class="mb-3">
      <label :for="'titulo' + id" class="form-label d-none">Título</label>
      <input v-model="titulo" type="text" class="form-control fondo-transparente" id="'titulo' + id" placeholder="Titulo de la nota">
    </div>
    <div class="mb-3">
      <label for="contenido" class="form-label d-none">Contenido</label>
      <textarea v-model="contenido" class="form-control fondo-transparente"  id="'contenido' + id" rows="3" placeholder="Contenido"></textarea>
    </div>
    <div class="d-flex justify-content-between align-items-center mx-auto">
      <button class="btn p-0" @click="deleteItem">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>
      </button>
      <p>{{note.date | formatDate}}</p>
      <input class="form-check-input" type="checkbox" v-model="status">
    </div>
  </div>`,

  methods: {
    deleteItem: function () {
      this.$emit("delete-item")
    },
  },

  watch: {
    status: function () {
      this.$emit("change-value", {
        key: "status",
        value: this.status
      })
    },
    titulo: function () {
      this.$emit("change-value", {
        key: "titulo",
        value: this.titulo
      })
    },
    contenido: function () {
      this.$emit("change-value", {
        key: "contenido",
        value: this.contenido
      })
    },
  },

  filters: {
    formatDate: function (value) {
      if (!value) return '';
      let date = new Date(value);
      let dd = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate();
      let mm = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
      let yyyy = date.getFullYear();
      
      return `${dd}/${mm}/${yyyy}`;
    }
  }
});
