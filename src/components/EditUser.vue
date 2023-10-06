<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <b-col md="11" class="mx-auto">
        <b-form class="justify-content-center" @submit.prevent="onSubmit">

          <b-form-group label="Username" :state="!!form.username" invalid-feedback="username is required">
            <b-form-input v-model="form.username" required></b-form-input>
          </b-form-group>

          <b-form-group label="Password" :state="!!form.password" invalid-feedback="password is required">
            <b-form-input v-model="form.password" required></b-form-input>
          </b-form-group>

          <b-form-group label="First Name" :state="!!form.firstname" invalid-feedback="First Name is required">
            <b-form-input v-model="form.firstname" required></b-form-input>
          </b-form-group>

          <b-form-group label="Last Name" :state="!!form.lastname" invalid-feedback="Last Name is required">
            <b-form-input v-model="form.lastname" required></b-form-input>
          </b-form-group>

          <!-- Type -->
          <b-form-group label="User Type" :state="!!form.type" invalid-feedback="Type is required">
            <b-form-select v-model="form.type" :options="types" required></b-form-select>
          </b-form-group>

          <b-button class="mb-2" type="submit" variant="primary">Update</b-button>
          <b-button class="mb-2" variant="danger" @click="closeModal">Close</b-button>
        </b-form>
      </b-col>
    </div>
  </div>
</template>

<script>
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/services/firebaseConfig';

export default {
  name: "EditCompany",
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    company: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      form: {
        username: null,
        password: null,
        firstname: null,
        lastname: null,
        type: null,
      },
      types: ["writer", "editor"],
      imageURL: null,
    };
  },
  methods: {
    onSubmit() {
      // Handle the form submission logic here
      console.log("Form submitted:", this.form);

      //upload the image to firebase -> magically get the public url, and append that to the json server, not the blob

      const articleData = {
        username: this.form.username,
        password: this.form.password,
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        type: this.form.type,
        status: "Active",
      };

      fetch("http://localhost:3000/users/" + this.company.id, {
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
  watch: { //update form values when you get the prop data
    company: {
      handler(newValue) {
        this.form.username = newValue.username,
          this.form.password = newValue.password,
          this.form.firstname = newValue.firstname,
          this.form.lastname = newValue.lastname,
          console.log(newValue.type);
        this.form.type = newValue.type
      },
      deep: true, // This ensures that deep properties of the object are reactive
      immediate: true // This ensures the handler is called immediately upon component creation
    },
    isFormVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.fetchData();
      }
    },
    isEditorVisible(newValue, oldValue) { //for editor, make one for writer, also implement this code in Editor and Writer Dashboard
      if (oldValue === true && newValue === false) {
        this.fetchData();
      }
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
