<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">ArchIntel</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Hide these if user isn't logged in-->
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link to="/" class="custom-nav-item"
              >All Media</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link to="/dashboard" class="custom-nav-item"
              >Dashboard</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link to="/login" class="not-white"
                >Log Out</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Router View -->
    <router-view></router-view>
  </div>
</template>

<script>
// You don't need to import the components here anymore since they're handled by the router
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>
a {
  text-decoration: none;
}

.custom-nav-item {
  color: white !important; /* Change text color to white */
}

.not-white {
  color: black !important; /* Change text color to white */
}

.custom-nav-item:hover {
  color: rgba(
    255,
    255,
    255,
    0.65
  ) !important; /* Change hover color (example: a shade of orange) */
}
</style>
