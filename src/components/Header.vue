<template>
  <b-navbar toggleable="lg">
    <b-navbar-brand href="#">CPSC 583</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item>
          <router-link :to="{ name: 'DesignOne' }">One</router-link>
        </b-nav-item>
        <b-nav-item href="#">Two</b-nav-item>
        <b-nav-item href="#">Three</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
}
</script>

<style scoped>
  .navbar-brand {
    color: white !important;
  }
  .navbar {
    background-color: #607D8B;
  }
  .nav-link,
  .nav-link a {
    color: rgba(255,255,255,0.9) !important;
  }
  .nav-link:hover,
  .nav-link a:hover {
    color: rgba(255,255,255,0.8) !important;
    text-decoration: none !important;
  }
</style>
