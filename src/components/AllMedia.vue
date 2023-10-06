<template>
  <div>
    <!-- Writer -->
    <EditArticleForm v-if="isEditorVisible" :closeModal="toggleVisibility" :article="article" />
    <div class="table-responsive-sm table-responsive-md table-responsive-lg"
      v-if="this.$store.state.user.type === 'writer'">
      <!-- Display error message if there's an error -->
      <div v-if="error">{{ error }}</div>

      <!-- Display loader while fetching data -->
      <div v-if="isLoading">Loading...</div>

      <b-table v-else :items="items">
        <!-- Custom table header using the thead-top slot -->
        <template #thead-top>
          <tr>
            <th colspan="10" class="text-center">All Media - Writer</th>
          </tr>
        </template>
        <!-- Custom column headers (optional) -->
        <template #head(image)> Image </template>
        <template #head(title)> Title </template>
        <template #head(link)> Link </template>
        <template #head(date)> Date </template>
        <template #head(writer_name)> Writer </template>
        <template #head(editor_name)> Editor </template>
        <!-- render the edit button -->
        <template #cell(status)="data">
          <b-button variant="success" @click="toggleVisibility(data.item)">Edit</b-button>
          <td v-if="data.item.status === 'Published'">{{ data.item.status }}</td>
        </template>
        <!-- render the image -->
        <template #cell(image)="data">
          <img :src="data.item.image" width="120" height="110" alt="Girl" />
        </template>
      </b-table>
    </div>
    <!-- Writer -->

    <!-- Editor -->
    <EditArticleFormEditor v-if="isEditorFormVisible" :closeModal="toggleEVisibility" :article="article" />
    <div class="table-responsive-sm table-responsive-md table-responsive-lg"
      v-if="this.$store.state.user.type === 'editor'">
      <!-- Display error message if there's an error -->
      <div v-if="error">{{ error }}</div>

      <!-- Display loader while fetching data -->
      <div v-if="isLoading">Loading...</div>

      <b-table v-else :items="items">
        <!-- Custom table header using the thead-top slot -->
        <template #thead-top>
          <tr>
            <th colspan="10" class="text-center">All Media - Editor</th>
          </tr>
        </template>
        <!-- Custom column headers (optional) -->
        <template #head(image)> Image </template>
        <template #head(title)> Title </template>
        <template #head(link)> Link </template>
        <template #head(date)> Date </template>
        <template #head(writer_name)> Writer </template>
        <template #head(editor_name)> Editor </template>

        <!-- render the edit button -->
        <template #cell(status)="data">
          <b-button variant="success" @click="toggleEVisibility(data.item)">Edit</b-button>
        </template>
        <!-- render the image -->
        <template #cell(image)="data">
          <img :src="data.item.image" width="120" height="110" alt="Girl" />
        </template>
      </b-table>
    </div>
    <!-- Editor -->
  </div>
</template>
<script>
import EditArticleFormEditor from "./EditArticleFormEditor.vue";
import EditArticleForm from "./EditArticleForm.vue";
export default {
  name: "HelloWorld",
  components: {
    EditArticleFormEditor,
    EditArticleForm
  },
  props: {
    msg: String,
  },
  data() {
    // Image, Title, Link, Date, Writer Name and Editor Name
    return {
      items: [],
      isLoading: false,
      error: null,
      isEditorFormVisible: false,
      isEditorVisible: false,
    };
  },
  methods: {
    toggleEVisibility(articleObject) {
      this.article = articleObject;
      this.isEditorFormVisible = !this.isEditorFormVisible;
    },
    toggleVisibility(articleObject) {
      this.article = articleObject;
      this.isEditorVisible = !this.isEditorVisible;
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch(process.env.VUE_APP_API_ENDPOINT + "/articles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.items = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await fetch(process.env.VUE_APP_API_ENDPOINT + "/articles");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.items = await response.json();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  },
  watch: {
    isEditorFormVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.fetchData();
      }
    },
    isEditorVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.fetchData();
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
