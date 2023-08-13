export const state = () => ({
  adminNavState: false,
  navState: false,
  dashboardNavState: false,
  fileURL: "",
  confirmMsg: "",
  confirmState: true,
  showDashboardNav: false,
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },

  getUserInfo(state) {
    return state.auth.user;
  },
};

export const mutations = {
  TOGGLE_ADMIN_NAV(state) {
    state.adminNavState = !state.adminNavState;
  },

  TOGGLE_NAV(state) {
    state.dashboardNavState = !state.dashboardNavState;
  },

  HIDE_DASHBOARD_NAV(state) {
    state.dashboardNavState = false;
  },

  HIDE_NAV(state) {
    state.adminNavState = false;
  },

  SET_URL(state, URL) {
    state.fileURL = URL;
  },

  SHOW_CONFIRMATION(state, { msg, status }) {
    state.confirmMsg = msg;
    state.confirmState = status;
  },

  TOGGLE_DASHBOARD_NAV(state) {
    state.showDashboardNav = !state.showDashboardNav;
  },
};

export const actions = {
  // async nuxtServerInit() {
  //   const time = new Date().getTime();
  //   try {
  //     await this.$axios.post("/transactions/check-active", { time: time });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
