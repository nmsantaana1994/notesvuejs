Vue.component("list-view", {
  data: function () {
    return {
      notes: [],
    };
  },
  template: `
    <div>

      <h2 class="my-3">Ingrese una tarea:</h2>

      <add-note @new-note="addNote($event)"></add-note>

      <h3 class="my-3">Tareas Pendientes:</h3>

      <note-item v-for="(note, index) in notes" :key="index + '-1'" :note="note" @change-value="changeValue($event, index)" @delete-item="deleteItem(index)" v-if="!note.status"></note-item>
      
      <hr>

      <h3 class="my-3">Tareas Realizadas:</h3>

      <note-item v-for="(note, index) in notes" :key="index + '-2'" :note="note" @change-value="changeValue($event, index)" @delete-item="deleteItem(index)" v-if="note.status"></note-item>
      
      <hr>
    </div>`,

  mounted() {
    let notesStorage = localStorage.getItem('notes');
    if(notesStorage) {
      this.notes = JSON.parse(notesStorage);
    }
  },

  methods: {
    addNote: function ({contenido, date, titulo}) {
      let newNote = {
        status: false,
        contenido: contenido,
        date: date,
        titulo: titulo,
        background: this.getNewColor()
      };

      this.notes.push(newNote);
    },
    getNewColor: function () {
      const colors = [
        "verde",
        "naranja",
        "amarillo",
        "rojo",
      ]
      
      return colors[Math.floor(Math.random() * colors.length)];
    },

    changeValue: function (change, index) {
      this.notes[index][change.key] = change.value;
      this.updateStorage();
    },
    deleteItem: function (index) {
      this.notes.splice(index, 1);
    },
    updateStorage: function () {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
  },

  watch: {
    notes: function () {
      this.updateStorage();
    },
  },
});
