<template>
  <div>
    <div class="d-flex justify-content-end">
      <!-- writer only, add conditionals when merged with backend/mock server -->
      <b-button variant="success" class="mt-2 me-2" @click="toggleVisibility">Add article</b-button>
    </div>
    <ArticleForm v-if="isVisible" :closeModal="toggleVisibility" />
    <!-- Toggle between writer/editor, display writer for now-->
    <WriterDashBoard v-if="this.$store.state.user.type === 'writer'" :key="writerKey" />
    <EditorDashBoard v-if="this.$store.state.user.type === 'editor'" :key="editorKey" />
  </div>
</template>

<script>
import ArticleForm from "./ArticleForm.vue";
import WriterDashBoard from "./WriterDashBoard.vue";
import EditorDashBoard from "./EditorDashBoard.vue";
export default {
  name: "DashBoard",
  components: {
    ArticleForm,
    WriterDashBoard,
    EditorDashBoard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    }
  },
  watch: {
    isVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.writerKey += 1;
        this.editorKey += 1;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
