<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-username"
        class="mt-3"
        label="Username"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="form.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        class="mt-3"
        label="Password"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="mt-3" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // Handle the login logic here
      console.log("Form submitted:", this.form);
    },
  },
};
</script>
