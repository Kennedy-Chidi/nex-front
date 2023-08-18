<template>
  <section id="footer" class="footer wf-section">
    <div class="container">
      <div class="footer-content-holder">
        <div class="inner-footer">
          <div class="footer-logo-part">
            <div class="footer-logo-holder">
              <nuxt-link to="/"
                ><img src="/Logo.png" loading="lazy" alt="" class="img-logo"
              /></nuxt-link>
            </div>
            <div class="footer-texts-holder">
              <div
                v-if="about.content"
                class="footer-top-text"
                v-html="`${about.content.substring(0, 300)}...`"
              ></div>
            </div>
          </div>
          <div class="footer-other-page">
            <div class="footer-header-holder">
              <h1 class="footer-header">Quick Links<br /></h1>
            </div>
            <div class="footer-page-flexer">
              <div class="each-footer-page">
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/about" class="link-3">About</nuxt-link>
                  </h4>
                </div>
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/plan" class="link-3">Plan</nuxt-link>
                  </h4>
                </div>
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/contact" class="link-3">Contact</nuxt-link>
                  </h4>
                </div>
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/news" class="link-3">Blog</nuxt-link>
                  </h4>
                </div>
              </div>

              <div class="each-footer-page">
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/signup" class="link-3"
                      >Get Started</nuxt-link
                    >
                  </h4>
                </div>
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/login" class="link-3">Login</nuxt-link>
                  </h4>
                </div>
                <div class="each-pages-holder">
                  <h4 class="sub-footer-text">
                    <nuxt-link to="/forgotten-password" class="link-3"
                      >Forgotten Password</nuxt-link
                    >
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div class="sucribe-other-page">
            <div class="footer-header-holder">
              <h1 class="footer-header">Subscribe<br /></h1>
            </div>
            <div class="light-text-holder">
              <div class="footer-top-text lighting">
                Sign up for Alerts, Special Offers and Global Market Updates.
              </div>
            </div>
            <div class="footer-input-holder">
              <div class="footer-input-block w-form">
                <div
                  v-if="showResponse"
                  class="sign-label response"
                  :class="{ error: isError }"
                >
                  {{ response }}
                </div>
                <label v-show="emailError" for="" class="label email error"
                  >Please Enter a valid username</label
                >
                <form>
                  <div class="input-icon-flexer">
                    <input
                      type="email"
                      class="text-field w-input"
                      maxlength="256"
                      name="email-2"
                      v-model="email"
                      placeholder="Enter Your Email"
                    />
                    <div v-if="onRequest" class="footer-yellow-icon">
                      <img
                        src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/64832b870db34f71153d13fc_loader-icon%201.svg"
                        loading="lazy"
                        alt=""
                        class="image-22"
                      />
                    </div>
                    <div
                      @click="processEmail"
                      v-else
                      class="footer-yellow-icon"
                    >
                      <img
                        src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ead14eeb1ff94ab83e2a_long-arrow-right-icon%201.svg"
                        loading="lazy"
                        alt=""
                        class="image-22"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="footer-social-media">
            <div class="footer-header-holder">
              <h1 class="footer-header">Instagram Feed<br /></h1>
            </div>
            <div class="media-box-flexer">
              <a href="#" class="each-media-box w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef0b71bd1ec3d6e8ef2d_17861742107367300-s.jpg"
                  loading="lazy"
                  alt=""
                  class="image-23" />
                <div class="media-cover active">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef9c1abb27b86bb87bf6_instagram-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-24"
                  /></div></a
              ><a href="#" class="each-media-box w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473f13f107043aab0901250_17876975147110586-s.jpg"
                  loading="lazy"
                  alt=""
                  class="image-23" />
                <div class="media-cover">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef9c1abb27b86bb87bf6_instagram-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-24"
                  /></div></a
              ><a href="#" class="each-media-box w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473f16afe15e42cfa74711f_17881737650044870-s.jpg"
                  loading="lazy"
                  alt=""
                  class="image-23" />
                <div class="media-cover">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef9c1abb27b86bb87bf6_instagram-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-24"
                  /></div></a
              ><a href="#" class="each-media-box w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473f1a2107043aab0905487_17894578420782119-s.jpg"
                  loading="lazy"
                  alt=""
                  class="image-23" />
                <div class="media-cover">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef9c1abb27b86bb87bf6_instagram-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-24"
                  /></div></a
              ><a href="#" class="each-media-box w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473f1c9101c81b742891c86_17983664692318714-s.jpg"
                  loading="lazy"
                  alt=""
                  class="image-23" />
                <div class="media-cover">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef9c1abb27b86bb87bf6_instagram-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-24"
                  /></div></a
              ><a href="#" class="each-media-box w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473f1e9101c81b742892fb2_18187364980025823-s.jpg"
                  loading="lazy"
                  alt=""
                  class="image-23" />
                <div class="media-cover">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6473ef9c1abb27b86bb87bf6_instagram-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-24"
                  /></div
              ></a>
            </div>
          </div>
        </div>

        <div class="footer-buttom-line"></div>
        <div class="buttom-text-holder">
          <div class="footer-buttom-text">
            Copyright © 2016-{{ new Date().getFullYear() }}
            {{ company.companyName }}
            All rights reserved
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      company: "",
      address: "",
      phone: "",
      email: "",
      about: "",
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      emailError: false,
    };
  },
  methods: {
    // loadScript() {
    //   if (!process.server) {
    //     let el1 = document.getElementById("translator");
    //     let el = document.getElementById("script");

    //     if (el1 != undefined) {
    //       document.body.removeChild(el1);
    //       document.body.removeChild(el);
    //     }

    //     const scriptTranslate = document.createElement("script");
    //     const script = document.createElement("script");

    //     scriptTranslate.type = "text/javascript";
    //     script.type = "text/javascript";

    //     scriptTranslate.src =
    //       "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false";
    //     script.src = "/script/smartSupp.js";
    //     scriptTranslate.async = true;
    //     script.async = true;

    //     scriptTranslate.id = "translator";
    //     script.id = "script";
    //     const app = document.querySelector("#footer");
    //     if (app) {
    //       app.appendChild(scriptTranslate);
    //       app.appendChild(script);
    //     } else {
    //       console.error("Could not find app node to append script element");
    //     }
    //   }
    // },

    setFileURL() {
      this.$store.commit("SET_URL", this.$config.FILE_URL);
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

    clearInputs() {
      this.email = "";
    },

    setArray() {
      this.checkArray = [{ name: "email", data: this.email }];
    },

    processEmail() {
      this.onRequest = true;
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (!this.isError) {
        return;
      }

      setTimeout(() => {
        this.callResponse("Thanks for subscribing successfully", false);
      }, 4000);
    },

    async getAbout() {
      try {
        const result = await this.$axios.get(`/about`);
        this.about = result.data.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = await result.data.data;
        this.address = result.data.data.media[0];
        this.phone = result.data.data.media[2];
      } catch (err) {
        console.log(err.response.data);
      }
    },

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
        const app = document.querySelector("#footer");
        if (app) {
          app.appendChild(scriptTranslate);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },
  },
  mounted() {
    this.loadScript();
    this.getAbout();
    this.setFileURL();
    this.getCompany();
  },
};
</script>

<style>
.img-logo {
  width: 120px;
}
label.email {
  font-size: 12px;
  font-weight: 300;
}
.input-icon-flexer input {
  color: white;
}
@media screen and (max-width: 425px) {
  .footer-social-media {
    display: none;
  }
}
</style>
