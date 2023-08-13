<template>
  <div class="side-dash-board" :class="{ show: navState }">
    <div class="sticky-navigation">
      <div class="board-logo-holder">
        <img
          @click="hideDashboardNav"
          src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460cb0d690df7d5dc496a17_decrease-text-indent-icon%201.svg"
          loading="lazy"
          alt=""
          class="menu-close"
        /><nuxt-link to="/" class="logo-holder"
          ><img src="/Logo.png" loading="lazy" alt=""
        /></nuxt-link>
      </div>
      <div class="all-button-holder">
        <nuxt-link
          to="/dashboard"
          class="nav-links"
          :class="{ active: route == 'dashboard' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460cf4aba0ad5d0c1bc8ba2_four-squares-line-icon%202.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Dashboard</div></nuxt-link
        ><nuxt-link
          to="/dashboard/deposit"
          class="nav-links"
          :class="{ active: route == 'dashboard-deposit' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460cb0d85d0ef5c36bfabc9_wallet-money-icon%202.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Deposit</div></nuxt-link
        ><nuxt-link
          to="/dashboard/withdraw-funds"
          class="nav-links"
          :class="{ active: route == 'dashboard-withdraw-funds' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460ca96a33287e54e85cda5_hand-money-income-dollar-icon%201.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Withdraw</div></nuxt-link
        ><nuxt-link
          to="/dashboard/transactions"
          class="nav-links"
          :class="{ active: route == 'dashboard-transactions' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c95a50cbb3577558d943_3d-modeling-icon%201.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Transactions</div></nuxt-link
        ><nuxt-link
          to="/dashboard/deposit-list"
          class="nav-links"
          :class="{ active: route == 'dashboard-deposit-list' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c9ddd6192761285fb9b0_chart-icon%201.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Deposit List</div></nuxt-link
        ><nuxt-link
          to="/dashboard/earnings"
          class="nav-links"
          :class="{ active: route == 'dashboard-earnings' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c7c6a5b90e89a2622c43_grow-money-icon%201.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Earnings</div></nuxt-link
        ><nuxt-link
          to="/dashboard/notifications"
          class="nav-links"
          :class="{ active: route == 'dashboard-notifications' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c3ae215f1e35135bc8dd_add-bell.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Notification</div></nuxt-link
        >
        <nuxt-link
          to="/dashboard/profile"
          class="nav-links"
          :class="{ active: route == 'dashboard-profile' }"
          ><img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c9bd5a61c167cdd48963_user-persona-icon%202.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Profile</div></nuxt-link
        >
        <nuxt-link
          to="/dashboard/referrals"
          class="nav-links"
          :class="{ active: route == 'dashboard-referrals' }"
          ><img
            src="/dashboard-images/referral.svg"
            loading="lazy"
            alt=""
            class="nav-link-img"
          />
          <div>Referrals</div></nuxt-link
        >
        <div @click="logout" class="each-button-flexer">
          <img
            src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c3445d6484a79c70a8b0_music-switch-on-off-button-icon%202.svg"
            loading="lazy"
            alt=""
            class="image-11"
          />
          <div class="button-text">Logout</div>
        </div>
      </div>
      <div class="down-nav-holder">
        <h1 class="down-logo-header">
          @Renex Holdings Aps - {{ new Date().getFullYear() }}
        </h1>
        <!-- <div class="down-logo-texts">
          This is some text inside of a div block.
        </div> -->
      </div>
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

  methods: {
    toggleDashboardNav() {
      this.$store.commit("TOGGLE_NAV");
    },

    hideDashboardNav() {
      this.$store.commit("HIDE_DASHBOARD_NAV");
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },

  computed: {
    navState() {
      return this.$store.state.dashboardNavState;
    },
  },

  mounted() {
    this.route = this.$route.name;
    this.hideDashboardNav();
  },
};
</script>

<style>
img.menu-close {
  top: 20px;
  right: -180px;
  cursor: pointer;
}
</style>
