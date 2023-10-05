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
          v-model="username"
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
          v-model="password"
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
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      //console.log("Form submitted:", this.form);
      const response = await fetch(
        `http://localhost:3000/users?username=${this.username}`
      );
      const users = await response.json();
      //console.log(users[0].type);
      if (users.length && users[0].password === this.password) {
        // Successful login
        console.log("Logged in successfully!");

        this.$store.commit("SET_USER", {
          firstname: users[0].firstname,
          lastname: users[0].lastname,
          type: users[0].type,
        }); //store to VueX

        //access data from VueX
        //console.log(this.$store.state.user);
        //access the username property from VueX
        //console.log(this.$store.state.user.lastname);

        //toggle as logged in
        this.$store.commit("SET_LOGIN_STATUS", true);
        localStorage.setItem("isLoggedIn", true);

        //redirect to dashboard
        this.$router.push({ path: "/" });
      } else {
        // Invalid credentials
        console.log("Invalid username or password");
      }
    },
  },
};
</script>
