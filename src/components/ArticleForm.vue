<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <b-col md="11" class="mx-auto">
        <div class="d-flex justify-content-end">
          <b-button class="mb-2" variant="danger" @click="closeModal">X</b-button>
        </div>
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
      companies: ["Company A", "Company B", "Company C"], // Sample company options
      content: "", //quill code starterpack?
    };
  },
  methods: {
    onSubmit() {
      // Handle the form submission logic here
      console.log("Form submitted:", this.form);
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
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
