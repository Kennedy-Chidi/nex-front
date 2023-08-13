<template>
  <div class="sign-up">
    <home-dark-navigation></home-dark-navigation>
    <section class="signup-hero wf-section">
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
            <div class="nav-link-text white">Create account</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Signup</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="signup-section-two wf-section">
      <div class="container">
        <div class="signup-two-content">
          <div class="top-notice-holder">
            <h1 class="section-head">Please create account</h1>
          </div>
          <div class="signup-form-holder">
            <div class="signup-form w-form">
              <div>
                <div class="text-input-holder">
                  <div class="each-input-holder">
                    <label
                      v-show="firstNameError"
                      for=""
                      class="label firstName error"
                      >Please Enter a Word for your First name</label
                    >
                    <input
                      type="text"
                      class="signup-input w-input"
                      maxlength="256"
                      name="frst name"
                      placeholder="Enter First Name*"
                      v-model="firstName"
                    />
                  </div>

                  <div class="each-input-holder">
                    <label
                      for=""
                      v-show="lastNameError"
                      class="label lastName error"
                      >Please Enter a Word for your Last name</label
                    >
                    <input
                      type="text"
                      class="signup-input w-input"
                      maxlength="256"
                      name="name"
                      v-model="lastName"
                      placeholder="Enter Last Name*"
                    />
                  </div>

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
                    <label v-show="emailError" for="" class="label email error"
                      >Please Enter a valid username</label
                    >
                    <input
                      type="email"
                      class="signup-input w-input"
                      maxlength="256"
                      name="email"
                      v-model="email"
                      placeholder="Enter your Email*"
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

                  <div class="each-input-holder">
                    <label
                      v-show="cPasswordError"
                      for=""
                      class="label cPassword"
                      >Please Enter a valid password that match</label
                    >
                    <input
                      type="password"
                      class="signup-input w-input"
                      maxlength="256"
                      name="name-4"
                      v-model="cPassword"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <div class="remember-holder">
                    <div @click="isChecked = !isChecked" class="remember-icon">
                      <div class="dot" v-if="isChecked"></div>
                    </div>
                    <div class="mini-texts odd">Remember me</div>
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
              <div class="text-info">
                Already have an account?
                <nuxt-link to="/login" class="link-text-holder w-inline-block"
                  ><div class="text-info">Login</div></nuxt-link
                >
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
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,

      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      cPassword: "",
      isChecked: false,

      referral: "",

      showCountryList: false,
      showDocumentList: false,

      firstNameError: false,
      lastNameError: false,
      usernameError: false,
      emailError: false,
      phoneNumberError: false,
      countryError: false,
      documentError: false,
      passportError: false,
      passwordError: false,
      cPasswordError: false,

      signup: "",
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
      if (input == "firstName") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          !/^[a-zA-Z0-9]+$/.test(data)
        ) {
          const parent = this.$el.querySelector(".firstName");
          parent.classList.add("error");
          this.isError = false;
          this.firstNameError = true;
          this.onRequest = false;
          return;
        } else {
          const parent = this.$el.querySelector(".firstName");
          parent.classList.remove("error");
          this.isError = true;
          this.firstNameError = false;
        }
      } else if (input == "lastName") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          !/^[a-zA-Z0-9]+$/.test(data)
        ) {
          const parent = this.$el.querySelector(".lastName");
          parent.classList.add("error");
          this.isError = false;
          this.lastNameError = true;
          this.onRequest = false;
          return;
        } else {
          const parent = this.$el.querySelector(".lastName");
          parent.classList.remove("error");
          this.isError = true;
          this.lastNameError = false;
        }
      } else if (input == "username") {
        if (!data || data.length < 2 || !/^\w+$/.test(data)) {
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
      } else if (input == "email") {
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
      } else if (input == "cPassword") {
        if (data != this.password || data == "") {
          const parent = this.$el.querySelector(".cPassword");
          parent.classList.add("error");
          this.isError = false;
          this.cPasswordError = true;
          this.onRequest = false;
          return;
        } else {
          const parent = this.$el.querySelector(".cPassword");
          parent.classList.remove("error");
          this.isError = true;
          this.cPasswordError = false;
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

    clearInputs() {
      this.firstName = "";
      (this.lastName = ""), (this.username = "");
      this.phoneNumber = "";
      this.email = "";
      this.password = "";
      this.cPassword = "";
      this.isChecked = false;
    },

    setArray() {
      this.checkArray = [
        { name: "firstName", data: this.firstName },
        { name: "lastName", data: this.lastName },
        { name: "username", data: this.username },
        { name: "email", data: this.email },
        { name: "password", data: this.password },
        { name: "cPassword", data: this.cPassword },
      ];
    },

    async getBanner() {
      try {
        const result = await this.$axios.get(`/banner/?bannerCategory=Signup`);
        this.banner = result.data.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async getSignupSettings() {
      try {
        const result = await this.$axios.post("/signup");
        this.signup = result.data.data;
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },

    async processUserData() {
      this.onRequest = true;
      // this.setArray();
      // this.checkArray.forEach((el) => {
      //   this.checkErrorInputs(el.name, el.data);
      // });
      // if (!this.isError) {
      //   return;
      // }
      if (!this.isChecked) {
        this.onRequest = false;
        this.callResponse(
          "Please read and accept the terms and conditions to continue",
          true
        );
        return;
      }

      const form = new FormData();
      form.append("firstName", this.firstName);
      form.append("lastName", this.lastName);
      form.append("username", this.username);
      form.append("email", this.email);
      form.append("regDate", new Date().getTime());
      form.append("referredBy", this.referral);
      form.append("totalAmount", 0);
      form.append("password", this.password);
      form.append("cPassword", this.cPassword);

      try {
        const result = await this.$axios.post("/users/signup", form);
        this.onRequest = false;
        const msg = result.data.message;
        this.callResponse(msg, false);
        this.clearInputs();
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },
  },

  mounted() {
    // this.getSignupSettings();
    this.getBanner();
    if (this.$route.query.username) {
      this.referral = this.$route.query.username;
    }
    this.loadScript();
  },

  computed: {
    countries() {
      return this.$store.state.registrationDetails.countries;
    },
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { HomeDarkNavigation },
};
</script>

<style>
.remember-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dot {
  background: #ffc40c;
  width: 10px;
  height: 10px;
}
</style>
