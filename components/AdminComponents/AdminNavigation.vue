<template>
  <div class="vertical-navbar" :class="{ show: navState }">
    <div class="sticky-navbar">
      <nuxt-link to="/" class="navbar-header">
        <img
          src="/admin-images/Logo.png"
          loading="lazy"
          sizes="130px"
          srcset="
            /admin-images/Logo.png  500w,
            /admin-images/Logo.png  800w,
            /admin-images/Logo.png 1080w,
            /admin-images/Logo.png 2284w
          "
          alt=""
          class="brand"
        />
      </nuxt-link>
      <img
        @click="toggleNav"
        class="menu-close"
        src="/admin-images/menu-close.svg"
        alt=""
      />
      <ul role="list" class="nav-list">
        <li class="nav-list">
          <nuxt-link
            :class="{ active: route == 'admin' }"
            to="/admin"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin' ? 'colored-dashboard.svg' : 'dashboard.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Dashboard</div></nuxt-link
          >
          <nuxt-link
            :class="{ active: route == 'admin-users' }"
            to="/admin/users"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-users' ? 'colored-users.svg' : 'users.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Users</div></nuxt-link
          >
          <nuxt-link
            :class="{ active: route.includes('add-user') }"
            to="/admin/add-user/new"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route.includes('add-user') ? 'colored-user.svg' : 'user.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Add User</div></nuxt-link
          >
          <nuxt-link
            :class="{ active: route == 'admin-plans' }"
            to="/admin/plans"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-accounts' ? 'colored-plans.svg' : 'plans.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Plans</div></nuxt-link
          >
          <nuxt-link
            :class="{ active: route == 'admin-reviews' }"
            to="/admin/reviews"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-reviews' ? 'colored-reviews.svg' : 'reviews.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Reviews</div></nuxt-link
          >
          <nuxt-link
            :class="{ active: route == 'admin-currencies' }"
            to="/admin/currencies"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-currencies'
                  ? 'colored-currency.svg'
                  : 'currency.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Currencies</div></nuxt-link
          >
          <nuxt-link
            :class="{ active: route.includes('transactions') }"
            to="/admin/transactions/list"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route.includes('transactions')
                  ? 'colored-deposit.svg'
                  : 'deposit.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Transactions</div></nuxt-link
          >

          <nuxt-link
            :class="{ active: route == 'admin-active-deposits' }"
            to="/admin/active-deposits"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-active-deposits'
                  ? 'colored-active.svg'
                  : 'active.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Active Deposits</div></nuxt-link
          >

          <nuxt-link
            :class="{ active: route == 'admin-email' }"
            to="/admin/email"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-email' ? 'colored-emails.svg' : 'emails.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Emails</div></nuxt-link
          >

          <nuxt-link
            :class="{ active: route == 'admin-pages' }"
            to="/admin/pages"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-pages' ? 'colored-pages.svg' : 'pages.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Pages</div></nuxt-link
          >

          <nuxt-link
            :class="{ active: route == 'admin-settings' }"
            to="/admin/settings"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-settings'
                  ? 'colored-settings.svg'
                  : 'settings.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Settings</div></nuxt-link
          >

          <nuxt-link
            :class="{ active: route == 'admin-referrals' }"
            to="/admin/referrals"
            class="nav-link w-inline-block"
            ><img
              :src="`/admin-images/${
                route == 'admin-referrals'
                  ? 'colored-referrals.svg'
                  : 'referrals.svg'
              }`"
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Referrals</div></nuxt-link
          >

          <span @click="logout" class="nav-link w-inline-block"
            ><img
              src="/admin-images/logout.svg
              "
              loading="lazy"
              alt=""
              class="nav-icon"
            />
            <div class="link-text">Logout</div></span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: "",
    };
  },
  computed: {
    navState() {
      return this.$store.state.adminNavState;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    toggleNav() {
      this.$store.commit("TOGGLE_ADMIN_NAV");
    },

    hideNav() {
      this.$store.commit("HIDE_NAV");
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },
  mounted() {
    this.route = this.$route.name;
    this.hideNav();
  },
};
</script>

<style>
.vertical-navbar {
  transition: all 0.3s;
}

/* .sticky-navbar {
  position: relative;
} */

.menu-close {
  position: absolute;
  right: 20px;
  top: 90px;
  cursor: pointer;
  width: 20px;
  display: none;
}

.nav-list a {
  cursor: pointer;
}

span.nav-link {
  cursor: pointer;
}

@media screen and (max-width: 991px) {
  .vertical-navbar.show {
    left: 0px;
    z-index: 999;
  }

  .menu-close {
    display: block;
  }
}

@media screen and (max-width: 380px) {
  .vertical-navbar.show {
    width: 100%;
  }
}
</style>
