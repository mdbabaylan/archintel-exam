<template>
  <div>
    <AddUser v-if="isFormVisible" :closeModal="toggleVisibility" :company="company" />
    <EditUser v-if="isEditorVisible" :closeModal="toggleEditorVisibility" :company="company" />
    <div class="d-flex justify-content-end">
      <!-- writer only, add conditionals when merged with backend/mock server -->
      <b-button variant="success" class="mt-2 me-2" @click="toggleVisibility">Add user</b-button>
    </div>
    <div class="table-responsive-sm table-responsive-md table-responsive-lg">
      <!-- Display error message if there's an error -->
      <div v-if="error">{{ error }}</div>

      <!-- Display loader while fetching data -->
      <div v-if="isLoading">Loading...</div>

      <b-table v-else :items="items">
        <!-- Custom table header using the thead-top slot -->
        <template #thead-top>
          <tr>
            <th colspan="10" class="text-center">User List</th>
          </tr>
        </template>

        <!-- Custom column headers (optional) -->
        <template #head(id)> ID </template>
        <template #head(username)> username </template>
        <template #head(password)> Name </template>
        <template #head(firstname)> First Name </template>
        <template #head(lastname)> Last Name </template>
        <template #head(type)> Type </template>

        <!-- render the edit button -->
        <template #cell(status)="data">
          <b-button variant="success" @click="toggleEditorVisibility(data.item)">Edit</b-button>
        </template>
      </b-table>
    </div>

  </div>
</template>
<script>
import AddUser from "./AddUser.vue";
import EditUser from "./EditUser.vue";
export default {
  name: "CompanyList",
  components: {
    AddUser,
    EditUser
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
      isEditorVisible: false,
      isFormVisible: false,
    };
  },
  methods: {
    toggleVisibility(companyObject) {
      this.company = companyObject;
      this.isFormVisible = !this.isFormVisible;
    },
    toggleEditorVisibility(companyObject) {
      this.company = companyObject;
      this.isEditorVisible = !this.isEditorVisible;
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch(process.env.VUE_APP_API_ENDPOINT + "/users");
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
      const response = await fetch(process.env.VUE_APP_API_ENDPOINT + "/users");
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
    isEditorVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.fetchData();
      }
    },
    isFormVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.fetchData();
      }
    },
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
