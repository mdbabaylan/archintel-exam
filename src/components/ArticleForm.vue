<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <b-col md="11" class="mx-auto">
        <b-form class="justify-content-center" @submit.prevent="onSubmit">
          <!-- Related Company -->
          <b-form-group
            label="Related Company"
            :state="!!form.company"
            invalid-feedback="Company is required"
          >
            <b-form-select
              v-model="form.company"
              :options="companies"
              required
            ></b-form-select>
          </b-form-group>

          <!-- Image Upload -->
          <b-form-group
            label="Image"
            :state="!!form.image"
            invalid-feedback="Image is required"
          >
            <!-- Set image to "plain" to fix the double label showing (from browser + custom implementation) -->
            <b-form-file v-model="form.image" plain required></b-form-file>
          </b-form-group>

          <!-- Title -->
          <b-form-group
            label="Title"
            :state="!!form.title"
            invalid-feedback="Title is required"
          >
            <b-form-input v-model="form.title" required></b-form-input>
          </b-form-group>

          <!-- Link -->
          <b-form-group
            label="Link"
            :state="!!form.link && isValidURL(form.link)"
            invalid-feedback="Valid URL is required"
          >
            <b-form-input v-model="form.link" required></b-form-input>
          </b-form-group>

          <!-- Date -->
          <b-form-group
            label="Date"
            :state="!!form.date"
            invalid-feedback="Date is required"
          >
            <b-form-datepicker v-model="form.date" required></b-form-datepicker>
          </b-form-group>

          <!-- Content used Quill, thanks Sir Lester, so they call it WYSIWYG huh, swapped out form.content with content from Quill/v-model) -->
          <b-form-group
            label="Content"
            :state="!!content"
            invalid-feedback="Content is required"
          >
            <!-- <b-form-textarea v-model="form.content" required></b-form-textarea> -->
            <!-- WYSIWYG editor instead of textarea-->
            <quill-editor v-model="content" required></quill-editor>
          </b-form-group>

          <b-button class="mb-2" type="submit" variant="primary">Submit</b-button>
          <b-button class="mb-2" variant="danger" @click="closeModal">Close</b-button>
        </b-form>
      </b-col>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";

export default {
  name: "ArticleForm",
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
  components: {
    quillEditor,
  },
  data() {
    return {
      form: {
        company: null,
        image: null,
        title: "",
        link: "",
        date: new Date().toISOString().substr(0, 10), // Default to current date
        content: "",
      },
      companies: [], // Sample company options
      content: "", //quill code starterpack?
    };
  },
  methods: {
    onSubmit() {
      // Handle the form submission logic here
      console.log("Form submitted:", this.form);

      //upload the image to firebase -> magically get the public url, and append that to the json server, not the blob

      const articleData = {
        image:
          "https://firebasestorage.googleapis.com/v0/b/archintel-imagestorage.appspot.com/o/122.PNG?alt=media&token=2c391603-ea74-477d-ad18-4241f2cced9a",
        title: this.form.title,
        link: this.form.link,
        date: this.form.date,
        content: this.content,
        status: this.form.status,
        Writer: this.$store.state.user.firstname + " " + this.$store.state.user.lastname,
        Editor: "",
        company: this.form.company,
      };

      fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.closeModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    isValidURL(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    },
  },

  //get list of companies
  async mounted() {
    this.isLoading = true;
    try {
      const response = await fetch(process.env.VUE_APP_API_ENDPOINT + "/companies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let temp_data = await response.json();
      this.companies = await temp_data.map((item) => item.name);
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.7); /* 70% black opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 90%;
  z-index: 1001;
  position: relative;
}
</style>
