<template>
  <div class="change-password">
    <home-dark-navigation />

    <section class="change-password-hero wf-section">
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
            <div class="nav-link-text white">Change password</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Change password</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="change-section-two wf-section">
      <div class="container">
        <div class="signup-two-content">
          <div class="top-notice-holder">
            <h1 class="section-head">Change password</h1>
          </div>
          <div class="signup-form-holder">
            <div class="signup-form w-form">
              <div>
                <div class="text-input-holder">
                  <div class="each-input-holder">
                    <label
                      v-show="passwordError"
                      for=""
                      class="label password error"
                      >Please Enter a valid password</label
                    >
                    <input
                      type="text"
                      class="signup-input w-input"
                      maxlength="256"
                      name="name"
                      v-model="password"
                      placeholder="Enter Password*"
                    />
                  </div>

                  <div class="each-input-holder">
                    <label
                      v-show="cPasswordError"
                      for=""
                      class="label cPassword error"
                      >Please enter a valid password that match</label
                    >
                    <input
                      type="password"
                      class="signup-input w-input"
                      maxlength="256"
                      name="name-4"
                      v-model="cPassword"
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
                    ><div class="yellow-slide-header black">Submit</div></span
                  >
                </div>
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
  components: { HomeDarkNavigation },
  data() {
    return {
      cPassword: "",
      password: "",
      complete: true,
      user: "",

      showResponse: false,
      isError: false,
      response: "",
      onRequest: false,

      isError: false,
      passwordError: false,
      cPasswordError: false,
    };
  },
  methods: {
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
      if (input == "password") {
        if (data == "" || !data || data.length < 6) {
          const parent = this.$el.querySelector(".password");
          parent.classList.add("error");
          this.isError = false;
          this.passwordError = true;
          this.onRequest = false;
          return false;
        } else {
          const parent = this.$el.querySelector(".password");
          parent.classList.remove("error");
          this.isError = true;
          this.passwordError = false;
        }
      } else if (input == "cPassword") {
        if (!data || data != this.password) {
          const parent = this.$el.querySelector(".cPassword");
          parent.classList.remove("error");
          this.isError = false;
          this.cPasswordError = true;
        } else {
          const parent = this.$el.querySelector(".cPassword");
          parent.classList.remove("error");
          this.isError = true;
          this.cPasswordError = false;
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
      this.processPassword();
    },

    setArray() {
      this.checkArray = [
        { name: "password", data: this.password },
        { name: "cPassword", data: this.cPassword },
      ];
    },

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

    async processPassword() {
      const form = {
        password: this.password,
        cPassword: this.cPassword,
      };

      try {
        await this.$axios.patch(
          `/users/reset-password/${this.$route.query.token}`,
          form
        );
        this.cPassword = "";
        this.password = "";
        this.callResponse(
          "Your password has been reset successfully, kindly login to continue.",
          false
        );
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },
  },
  mounted() {
    this.loadScript();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
