<template>
  <div class="forgot-password">
    <home-dark-navigation></home-dark-navigation>
    <section class="forget-password-hero wf-section">
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
            <div class="nav-link-text white">Forgot password</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Forgot password</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="forgot-section-two wf-section">
      <div class="container">
        <div class="signup-two-content">
          <div class="top-notice-holder">
            <h1 class="section-head">Recover account</h1>
          </div>
          <div class="signup-form-holder">
            <div class="signup-form w-form">
              <div>
                <div class="text-input-holder">
                  <div class="notify-header-holder">
                    <div class="text-info changer">
                      If you have an account, enter your email to recover it.
                    </div>
                  </div>
                  <div class="each-input-holder">
                    <label v-show="emailError" for="" class="label email error"
                      >Please Enter a valid email</label
                    >
                    <input
                      type="email"
                      class="signup-input w-input"
                      maxlength="256"
                      v-model="email"
                      name="email"
                      @keypress.enter="processUserData"
                      placeholder="Enter your Email"
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
                      class="image-39"
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
              <span class="linked-texts-holder w-inline-block"
                ><div class="text-info">
                  Already have an account?
                  <nuxt-link
                    to="/login"
                    class="link-text-holder w-inline-block"
                  >
                    Login
                  </nuxt-link>
                </div></span
              >
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
      email: "",

      showResponse: false,
      isError: false,
      response: "",
      onRequest: false,
      emailError: false,
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

    checkErrorInputs(input, data) {
      if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          const parent = this.$el.querySelector(".email");
          parent.classList.add("error");
          this.isError = false;
          this.emailError = true;
          this.onRequest = false;
          return;
        } else {
          const parent = this.$el.querySelector(".email");
          parent.classList.remove("error");
          this.isError = true;
          this.emailError = false;
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

    processUserData() {
      this.onRequest = true;
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (!this.isError) {
        return;
      }
      this.processEmail();
    },

    async processEmail() {
      const form = {
        email: this.email,
      };

      try {
        await this.$axios.patch(`/users/forgotten-password`, form);
        this.callResponse(
          "Please verify your email and click on the link button to continue.",
          false
        );
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
      this.checkArray = [{ name: "email", data: this.email }];
    },
  },
  mounted() {
    this.loadScript();
    this.getBanner();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { HomeDarkNavigation },
};
</script>

<style></style>
