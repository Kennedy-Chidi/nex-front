<template>
  <div class="top-holder">
    <div class="top-link-holder">
      <div id="top" class="top-logo">
        <img
          @click="toggleDashboardNav"
          src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6445ef4447bf1a3b248f87b6_hamburger-menu-icon%203.svg"
          loading="lazy"
          alt=""
          class="image-37"
        /><img src="/Logo.png" loading="lazy" alt="" class="dashboard-logo" />
        <div id="ytWidget"></div>
      </div>
      <div class="welcome-holder">
        <div class="top-header-holder">
          <h1 class="top-header dash">Welcome To {{ company.companyName }}</h1>
        </div>
        <div class="top-text-holder">
          <div class="top-text">
            Hi, {{ user.firstName }} {{ user.lastName }} Welcome back.
          </div>
        </div>
      </div>
    </div>
    <div class="icon-profile-holder">
      <nuxt-link to="/dashboard/notifications" class="icon-holder gap">
        <img
          src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c3ae215f1e35135bc8dd_add-bell.svg"
          loading="lazy"
          alt=""
          class="image-14"
        />
      </nuxt-link>
      <div class="icon-holder" @click="logout">
        <img
          src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c3445d6484a79c70a8b0_music-switch-on-off-button-icon%202.svg"
          loading="lazy"
          alt=""
          class="image-15"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: "",
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el1 = document.getElementById("translator");

        if (el1 != undefined) {
          document.body.removeChild(el1);
        }

        const scriptTranslate = document.createElement("script");
        scriptTranslate.type = "text/javascript";
        scriptTranslate.src =
          "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false";
        scriptTranslate.async = true;
        scriptTranslate.id = "translator";
        const app = document.querySelector("#top");
        if (app) {
          app.appendChild(scriptTranslate);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },

    toggleDashboardNav() {
      this.$store.commit("TOGGLE_NAV");
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = result.data.data;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },
  mounted() {
    this.loadScript();
    this.getCompany();
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  head() {
    return {
      link: [
        {
          href: "/css/Dashboard.css",
          type: "text/css",
          rel: "stylesheet",
        },
      ],
    };
  },
};
</script>

<style>
.dashboard-logo {
  max-width: 120px;
}
</style>
