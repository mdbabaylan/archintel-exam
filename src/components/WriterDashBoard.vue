<template>
  <div>
    <EditArticleForm v-if="isEditorVisible" :closeModal="toggleVisibility" :article="article" />
    <div class="table-responsive-sm table-responsive-md table-responsive-lg">
      <!-- Display error message if there's an error -->
      <div v-if="error">{{ error }}</div>

      <!-- Display loader while fetching data -->
      <div v-if="isLoading">Loading...</div>

      <b-table v-else :items="for_edit_items">
        <template #thead-top>
          <tr>
            <th colspan="10" class="text-center">Writer's Dashboard - For Edit</th>
          </tr>
        </template>
        <!-- Custom column headers (optional) -->
        <template #head(image)> Image </template>
        <template #head(title)> Title </template>
        <template #head(link)> Link </template>
        <template #head(date)> Date </template>
        <template #head(writer_name)> Writer </template>
        <template #head(editor_name)> Editor </template>
        <template #head(company)> Company </template>
        <template #cell(status)="data">
          <b-button variant="success" v-if="data.item.status === 'For Edit'"
            @click="toggleVisibility(data.item)">Edit</b-button>
          <td v-if="data.item.status !== 'For Edit'">{{ data.item.status }}</td>
        </template>

        <template #cell(image)="data">
          <img :src="data.item.image" width="120" height="110" alt="Girl" />
        </template>
      </b-table>

      <br />
      <br />
      <br />
      <!-- Display error message if there's an error -->
      <div v-if="error">{{ error }}</div>

      <!-- Display loader while fetching data -->
      <div v-if="isLoading">Loading...</div>

      <b-table v-else :items="for_publishing_items">
        <!-- Custom table header using the thead-top slot -->
        <template #thead-top>
          <tr>
            <th colspan="10" class="text-center">Writer's Dashboard - Published</th>
          </tr>
        </template>
        <!-- Custom column headers (optional) -->
        <!-- <template #cell(image)="">
        <img :src="data.items.image" width="120" height="110" alt="Girl" />
      </template> -->
        <template #head(image)> Image </template>
        <template #head(title)> Title </template>
        <template #head(link)> Link </template>
        <template #head(date)> Date </template>
        <template #head(writer_name)> Writer </template>
        <template #head(editor_name)> Editor </template>
        <template #head(company)> Company </template>

        <template #cell(image)="data">
          <img :src="data.item.image" width="120" height="110" alt="Girl" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import EditArticleForm from "./EditArticleForm.vue";

export default {
  name: "WriterDashBoard",
  components: {
    EditArticleForm
  },
  props: {
    msg: String,
  },
  data() {
    // Image, Title, Link, Date, Writer Name and Editor Name
    return {
      for_edit_items: [],
      for_publishing_items: [],
      isLoading: false,
      error: null,
      isEditorVisible: false,
      currentArticleId: null
    };
  },
  methods: {
    toggleVisibility(articleObject) {
      this.article = articleObject;
      this.isEditorVisible = !this.isEditorVisible;
    }
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await fetch(process.env.VUE_APP_API_ENDPOINT + "/articles");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let temp_data = await response.json();
      this.for_edit_items = await temp_data.filter((item) => item.status == "For Edit");
      this.for_publishing_items = await temp_data.filter(
        (item) => item.status == "Published"
      );
      //this.items = await response.json();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  },
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
