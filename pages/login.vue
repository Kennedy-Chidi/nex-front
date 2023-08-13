<template>
  <div class="login">
    <home-dark-navigation></home-dark-navigation>
    <section class="login-hero wf-section">
      <div class="container">
        <div class="short-content-holder">
          <div class="top-hint-holder dark">
            <div class="top-nav-content">
              <div class="nav-link-text white">
                <a href="#" class="home-link white">Home</a>
              </div>
            </div>
            <img
              src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/648022a70480e81309435a42_arrow-up-337-svgrepo-com%201.svg"
              loading="lazy"
              alt=""
              class="hero-arrow-push"
            />
            <div class="nav-link-text white">Login</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Login</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="login-section-two wf-section">
      <div class="container">
        <div class="signup-two-content">
          <div class="top-notice-holder">
            <h1 class="section-head">Login</h1>
          </div>
          <div class="signup-form-holder">
            <div class="signup-form w-form">
              <div>
                <div class="text-input-holder">
                  <div class="each-input-holder">
                    <label
                      v-show="usernameError"
                      for=""
                      class="label username error"
                      >Please Enter a valid username</label
                    >
                    <input
                      type="text"
                      class="signup-input w-input"
                      maxlength="256"
                      name="name"
                      v-model="username"
                      placeholder="Enter Username*"
                    />
                  </div>

                  <div class="each-input-holder">
                    <label
                      v-show="passwordError"
                      for=""
                      class="label password error"
                      >Password must be at least 6 alphanumeric
                      characters</label
                    >
                    <input
                      type="password"
                      class="signup-input w-input"
                      maxlength="256"
                      name="name-4"
                      v-model="password"
                      placeholder="Enter Password"
                    />
                  </div>

                  <div class="label error" v-if="showResponse">
                    {{ response }}
                  </div>

                  <span v-if="onRequest" class="login-button w-inline-block"
                    ><img
                      src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/64832b870db34f71153d13fc_loader-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="image-40"
                    />
                    <div class="yellow-slide-header black">
                      Processing
                    </div></span
                  >

                  <span
                    v-else
                    @click="processUserData"
                    class="login-button w-inline-block"
                    ><div class="yellow-slide-header black">Login</div></span
                  >
                </div>
              </div>

              <div class="text-info">
                Already have an account?
                <nuxt-link to="/signup">Click here</nuxt-link>
              </div>

              <div class="text-info">
                Forgot Password?
                <nuxt-link to="/forgotten-password">Click here</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeDarkNavigation from "../components/HomeDarkNavigation.vue";
export default {
  data() {
    return {
      banner: "",
      username: "",
      password: "",
      complete: true,
      user: "",

      showResponse: false,
      isError: false,
      response: "",
      onRequest: false,

      isChecked: false,
      isError: false,

      usernameError: false,
      passwordError: false,
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el = document.getElementById("script");

        if (el != undefined) {
          document.body.removeChild(el);
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "/script/home.js";
        script.async = true;
        script.id = "script";
        const app = document.querySelector("#footer");
        if (app) {
          app.appendChild(script);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },

    callResponse(msg, state) {
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    checkErrorInputs(input, data) {
      if (input == "username") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          !/^[a-zA-Z0-9]+$/.test(data)
        ) {
          const parent = this.$el.querySelector(".username");
          parent.classList.add("error");
          this.isError = false;
          this.usernameError = true;
          this.onRequest = false;
          return;
        } else {
          const parent = this.$el.querySelector(".username");
          parent.classList.remove("error");
          this.isError = true;
          this.usernameError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data.length < 6) {
          const parent = this.$el.querySelector(".password");
          parent.classList.add("error");
          this.isError = true;
          this.passwordError = true;
          this.onRequest = false;
          return false;
        } else {
          const parent = this.$el.querySelector(".password");
          parent.classList.remove("error");
          this.isError = true;
          this.passwordError = false;
        }
      }
    },

    processUserData() {
      this.onRequest = true;
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (!this.isError) {
        return;
      }
      const form = {
        username: this.username,
        password: this.password,
      };
      this.handleLogin(form);
    },

    async handleLogin(form) {
      try {
        const result = await this.$auth.loginWith("local", { data: form });
        const user = result.data.user;
        if (user.status == "Admin") {
          this.$router.push("/admin");
        } else {
          this.$router.push("/dashboard");
        }
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },

    async getBanner() {
      try {
        const result = await this.$axios.get(`/banner/?bannerCategory=Login`);
        this.banner = result.data.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    setArray() {
      this.checkArray = [
        { name: "username", data: this.username },
        { name: "password", data: this.password },
      ];
    },
  },

  mounted() {
    this.getBanner();
    if (this.isAuthenticated) {
      this.$router.push("/dashboard");
    }
    this.loadScript();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  components: { HomeDarkNavigation },
};
</script>

<style></style>
