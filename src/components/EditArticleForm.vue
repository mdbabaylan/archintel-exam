<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <b-col md="11" class="mx-auto">
        <b-form class="justify-content-center" @submit.prevent="onSubmit">
          <!-- Related Company -->
          <b-form-group label="Related Company" :state="!!form.company" invalid-feedback="Company is required">
            <b-form-select v-model="form.company" :options="companies" required></b-form-select>
          </b-form-group>

          <!-- Image Upload -->
          <b-form-group label="Image" :state="!!form.image" invalid-feedback="Image is required">
            <!-- Set image to "plain" to fix the double label showing (from browser + custom implementation) -->
            <p v-if="imageURL">Image URL: {{ imageURL }}</p>
            <b-form-file v-model="form.image" plain @change="handleFileUpload"></b-form-file>
          </b-form-group>

          <!-- Title -->
          <b-form-group label="Title" :state="!!form.title" invalid-feedback="Title is required">
            <b-form-input v-model="form.title" required></b-form-input>
          </b-form-group>

          <!-- Link -->
          <b-form-group label="Link" :state="!!form.link && isValidURL(form.link)"
            invalid-feedback="Valid URL is required">
            <b-form-input v-model="form.link" required></b-form-input>
          </b-form-group>

          <!-- Date -->
          <b-form-group label="Date" :state="!!form.date" invalid-feedback="Date is required">
            <b-form-datepicker v-model="form.date" required></b-form-datepicker>
          </b-form-group>

          <!-- Content used Quill, thanks Sir Lester, so they call it WYSIWYG huh, swapped out form.content with content from Quill/v-model) -->
          <b-form-group label="Content" :state="!!content" invalid-feedback="Content is required">
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
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/services/firebaseConfig';

export default {
  name: "EditArticleForm",
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    article: {
      type: Object,
      required: false,
      default: null
    }
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
      imageURL: null,
    };
  },
  methods: {
    onSubmit() {
      // Handle the form submission logic here
      console.log("Form submitted:", this.form);

      //upload the image to firebase -> magically get the public url, and append that to the json server, not the blob

      const articleData = {
        image: this.imageURL,
        title: this.form.title,
        link: this.form.link,
        date: this.form.date,
        content: this.content,
        Writer: this.$store.state.user.firstname + " " + this.$store.state.user.lastname,
        Editor: "",
        company: this.form.company,
        status: "For Edit",
      };

      fetch(process.env.VUE_APP_API_ENDPOINT + "/articles/" + this.article.id, {
        method: "PUT",
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
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const storageRef = ref(storage, 'uploads/' + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Wait for the upload to complete
          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
              (snapshot) => {
                // You can add progress tracking here if needed
                console.log(snapshot);
              },
              (error) => {
                reject(error);
              },
              () => {
                resolve();
              }
            );
          });

          // Get the public URL of the uploaded file
          this.imageURL = await getDownloadURL(storageRef);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }
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
  watch: { //update form values when you get the prop data
    article: {
      handler(newValue) {
        this.imageURL = newValue.image;
        this.form.title = newValue.title;
        this.form.link = newValue.link;
        this.form.date = newValue.date;
        this.content = newValue.content;
        this.form.writer = newValue.writer;
        this.form.editor = newValue.editor;
        this.form.company = newValue.company;
      },
      deep: true, // This ensures that deep properties of the object are reactive
      immediate: true // This ensures the handler is called immediately upon component creation
    }
  }


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
  background-color: rgba(0, 0, 0, 0.7);
  /* 70% black opacity */
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
