<template>
  <section class="nav-section wf-section">
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      class="navbar w-nav"
    >
      <div class="container">
        <div class="navbar-content-holder">
          <div>
            <nuxt-link
              :to="{
                path: '/',
                query: { username: $route.query.username },
              }"
              class="brand-logo"
            >
              <img src="/Logo.png" loading="lazy" alt="" class="site-logo" />
            </nuxt-link>
            <div id="ytWidget"></div>
          </div>

          <nav role="navigation" class="nav-menu w-nav-menu">
            <nuxt-link
              :to="{
                path: '/',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >Home</nuxt-link
            ><nuxt-link
              :to="{
                path: '/about',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >About Us</nuxt-link
            >

            <nuxt-link
              :to="{
                path: '/plan',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >Plan</nuxt-link
            >
            <nuxt-link
              :to="{
                path: '/contact',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >Contact</nuxt-link
            ><nuxt-link
              :to="{
                path: '/faq',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >Faq</nuxt-link
            ><nuxt-link
              :to="{
                path: '/news',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >News</nuxt-link
            >

            <nuxt-link
              :to="{
                path: '/signup',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >Signup</nuxt-link
            >

            <nuxt-link
              :to="{
                path: '/login',
                query: { username: $route.query.username },
              }"
              class="each-nav-link w-nav-link"
              >login</nuxt-link
            >
            <!-- <nuxt-link
              v-if="isAuthenticated"
              to="/dashboard"
              class="each-nav-link w-nav-link"
              >Dashboard</nuxt-link
            >

            <span
              v-if="isAuthenticated"
              @click="logout"
              class="each-nav-link w-nav-link"
              >logout</span
            >

             -->
          </nav>
          <div class="menu-button w-nav-button">
            <div class="icon w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
};
</script>

<style>
.site-logo {
  max-width: 140px;
}
</style>
