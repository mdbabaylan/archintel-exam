<template>
  <div>
    <p>Dashboard. Conditionally render Writer or Editor depending on the user type</p>
    <div class="d-flex justify-content-end">
      <!-- writer only, add conditionals when merged with backend/mock server -->
      <b-button variant="success" class="me-2">Add article</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  props: {
    msg: String,
  },
  data() {
    // Image, Title, Link, Date, Writer Name and Editor Name
    return {};
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
