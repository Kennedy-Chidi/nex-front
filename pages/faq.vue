<template>
  <div class="faq">
    <home-dark-navigation></home-dark-navigation>
    <section class="faq-hero wf-section">
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
            <div class="nav-link-text white">Faq</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Faq</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="faq-section-two wf-section">
      <div class="container">
        <div class="faq-two-content">
          <div class="faq-content-holder">
            <div v-for="cat in faqCategories" :key="cat._id" class="each-faq">
              <div class="faq-top-holder">
                <h1 class="lite">{{ cat }}</h1>
              </div>
              <div
                v-for="faq in filteredFAQ(cat)"
                :key="faq._id"
                class="faq-inner-content"
              >
                <div class="top-inner-content" @click="toggleQuestion(faq)">
                  <div class="faq-top-holds">
                    <h1 class="mini-header home-blog">{{ faq.question }}</h1>
                  </div>
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/64715010c2a4c330484f431d_plus-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-36"
                  />
                </div>
                <div v-if="faq.checked" class="holds-text">
                  <div class="mini-texts off" v-html="faq.answer"></div>
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
  data() {
    return {
      banner: "",
      faqs: [],
      faqCategories: [],
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

    filteredFAQ(data) {
      return this.faqs.filter((item) => item.category === data);
    },

    getFaqCategories(data) {
      this.faqCategories = [...new Set(data.map((item) => item.category))];
    },

    toggleQuestion(question) {
      this.checkFAQs(this.faqs);
      question.checked = !question.checked;
    },

    checkFAQs(data) {
      data.forEach((el) => {
        el.checked = false;
      });
      return data;
    },

    async getFaqs() {
      try {
        const result = await this.$axios.get("/faq/?limit=60");
        this.getFaqCategories(result.data.data);
        this.faqs = await this.checkFAQs(result.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getBanner() {
      try {
        const result = await this.$axios.get(`/banner/?bannerCategory=FAQ`);
        this.banner = result.data.data[0];
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.loadScript();
    this.getBanner();
    this.getFaqs();
  },
  components: { HomeDarkNavigation },
};
</script>

<style></style>
