<template>
  <!-- ======= Header ======= -->
  <header id="header" :class="{ 'header-scrolled': isScrolled }" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <RouterLink class="userDetails logo d-flex align-items-center" :to="{ path: '/' }"> <img src="../assets/main-logo.webp"
          alt=""></RouterLink>

      <nav id="navbar" class="navbar">
        <ul>
          <li> <RouterLink class="userDetails active" :to="{ path: '/' }">Home</RouterLink></li>
          <li><RouterLink class="userDetails active" :to="{ path: '/about' }">About</RouterLink></li>
          <li v-if="this.$store.state.authentiation">
            <RouterLink class="userDetails d-flex flex-column align-items-start" :to="{ path: '/profile' }">
              <div class="text-capitalize text-white fs-4">{{ this.$store.getters.getUserData.first_name }} {{ this.$store.getters.getUserData.last_name }}</div>
              <div>{{ this.$store.getters.getUserData.email }}</div>
            </RouterLink>
          </li>
          <li v-else>
            <RouterLink class="get-a-quote" :to="{ path: '/login' }">Login Here</RouterLink>
          </li>
        </ul>
      </nav><!-- .navbar -->

    </div>
  </header>
  <!-- End Header -->
  <!-- End Header -->
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
  }
}
</script>

<style>
.header-scrolled {
  background-color: #ae9c37;
  transition: background-color 0.3s ease;
}
.userDetails{
  text-decoration: none;
}
</style>