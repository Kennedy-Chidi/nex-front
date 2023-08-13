<template>
  <div class="contact">
    <home-dark-navigation></home-dark-navigation>

    <section class="contact-hero-section wf-section">
      <div class="container">
        <div class="about-hero-content">
          <div class="top-hint-holder">
            <div class="top-nav-content">
              <div class="nav-link-text">
                <a href="#" class="home-link">Home</a>
              </div>
            </div>
            <img
              src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6474006295fb51d4b877cd82_line-angle-right-icon%20(1)%201.svg"
              loading="lazy"
              alt=""
              class="hero-arrow-push"
            />
            <div class="nav-link-text">Company overviiew</div>
          </div>
          <div class="contact-top-holder">
            <h1 class="section-head">Contact two</h1>
          </div>
          <div class="switch-side">
            <div class="contact-info-content">
              <div class="contact-text-holder">
                <div class="assit-texts">
                  Please let us know if you have a question, want to leave a
                  comment, or would like further information about Blockchain
                  WP.
                </div>
              </div>
              <div class="top-contact-line"></div>
              <div class="contact-sign-holder">
                <h1 class="mini-header">Contact Details</h1>
              </div>
              <div class="contact-details-content">
                <div v-if="address" class="contact-details-each">
                  <img
                    :src="`${FILE_URL}/${address.icon}`"
                    loading="lazy"
                    alt=""
                    class="details-locate-icon"
                  />
                  <div class="text-info">
                    {{ address.text }}
                  </div>
                </div>
                <div v-if="email" class="contact-details-each">
                  <img
                    :src="`${FILE_URL}/${email.icon}`"
                    loading="lazy"
                    alt=""
                    class="details-locate-icon"
                  />
                  <div class="text-info">
                    {{ email.text }}
                  </div>
                </div>
                <div v-if="phone" class="contact-details-each">
                  <img
                    :src="`${FILE_URL}/${phone.icon}`"
                    loading="lazy"
                    alt=""
                    class="details-locate-icon"
                  />
                  <div class="text-info">
                    {{ phone.text }}
                  </div>
                </div>
              </div>

              <!---<div class="media-icon-link">
                <a href="#" class="media-linked-icon w-inline-block"
                  ><img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/64725622c7cd7ef4f61b7468_facebook-round-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="facebook-details-icon" /></a
                ><a href="#" class="media-linked-icon w-inline-block"
                  ><img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/6472561a7d567f3b94569683_twitter-round-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="twiitt-details-icon" /></a
                ><a href="#" class="media-linked-icon w-inline-block"
                  ><img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/647256138126600a5a904a34_instagram-f-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="insta-details-icon" /></a
                ><a href="#" class="media-linked-icon w-inline-block"
                  ><img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/647fecf390c034207705ae44_google-plus-alt-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="goog-details-icon" /></a
                ><a href="#" class="media-linked-icon w-inline-block"
                  ><img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/647fecfbae90552e4c950869_skype-round-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="skp-details-icon"
                /></a>
              </div>-->
            </div>
            <div class="inputer-contact-holder">
              <div class="contact-form w-form">
                <div>
                  <div class="contact-input-flexer">
                    <div class="first-row">
                      <div class="input-lenght-holder">
                        <input
                          type="text"
                          class="input-contact-space w-input"
                          maxlength="256"
                          placeholder="Enter Your name*"
                          v-model="name"
                        />
                      </div>
                      <div class="input-lenght-holder">
                        <input
                          type="text"
                          class="input-contact-space w-input"
                          maxlength="256"
                          name="name-3"
                          placeholder="Title"
                        />
                      </div>

                      <div class="input-lenght-holder">
                        <input
                          type="email"
                          class="input-contact-space w-input"
                          maxlength="256"
                          name="email"
                          v-model="email1"
                          placeholder="Enter Your Email*"
                        />
                      </div>
                    </div>
                    <div class="second-row">
                      <div class="input-lenght-holder">
                        <input
                          type="text"
                          class="input-contact-space w-input"
                          maxlength="256"
                          placeholder="Subject"
                        />
                      </div>
                      <div class="input-lenght-holder">
                        <textarea
                          placeholder="Example Text"
                          maxlength="5000"
                          id="field"
                          name="field"
                          v-model="content"
                          class="contact-textarea w-input"
                        ></textarea>
                      </div>
                      <div class="label error" v-if="showResponse">
                        {{ response }}
                      </div>
                      <div v-if="onRequest" class="button-black">
                        <img
                          src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/64832b870db34f71153d13fc_loader-icon%201.svg"
                          loading="lazy"
                          alt=""
                          class="image-38"
                        />
                        <h5 class="yellow-slide-header black">Processing</h5>
                        <img
                          src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/646ca40b5abf546bdb737529_line-angle-right-icon%201.svg"
                          loading="lazy"
                          alt=""
                          class="image-34"
                        />
                      </div>
                      <div v-else class="button-black" @click="sendMessage">
                        <h5 class="yellow-slide-header black">Submit</h5>
                        <img
                          src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/646ca40b5abf546bdb737529_line-angle-right-icon%201.svg"
                          loading="lazy"
                          alt=""
                          class="image-34"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12904.244979220142!2d14.22919690575524!3d36.04321115976615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130fb4f7d1fb53bb%3A0xed73b8ad261ff1a0!2sVictoria%2C%20Malta!5e0!3m2!1sen!2sru!4v1686644997601!5m2!1sen!2sru"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeDarkNavigation from "../components/HomeDarkNavigation.vue";
export default {
  data() {
    return {
      company: "",
      address: "",
      phone: "",

      content: "",
      name: "",
      email: "",
      email1: "",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
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

    clearInputs() {
      this.email1 = "";
      this.name = "";
      this.content = "";
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

    async getCompany() {
      try {
        const result = await this.$axios.get(`/company`);
        this.company = result.data.data[0];
        this.media = this.company.media;
        this.loadScript();
      } catch (err) {
        console.log(err);
      }
    },

    async sendMessage() {
      this.onRequest = true;
      if (this.name == "" || this.name.length < 2) {
        this.callResponse("Please write a valid name.", true);
        return;
      }
      if (
        this.email1 == "" ||
        !this.email1 ||
        !/^\S+@\S+\.\S+$/.test(this.email1)
      ) {
        this.callResponse("Please provide a valid email.", true);
        return;
      }
      if (this.content.trim() == "" || this.content.length < 30) {
        this.callResponse(
          "Sorry content must be at least 30 characters long.",
          true
        );
        return;
      }

      const form = {
        name: this.name,
        email: this.email1,
        content: this.content,
      };

      try {
        await this.$axios.post(`/emails/send-message`, form);
        this.callResponse("Message sent successfully", false);
        this.clearInputs();
      } catch (err) {
        this.callResponse(err.response.data.message);
      }
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = await result.data.data;
        this.address = result.data.data.media[0];
        this.email = result.data.data.media[1];
        this.phone = result.data.data.media[2];
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },

  mounted() {
    this.loadScript();
    this.getCompany();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { HomeDarkNavigation },
};
</script>

<style>
.button-black {
  cursor: pointer;
}
</style>
