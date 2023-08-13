<template>
  <div class="news">
    <home-dark-navigation></home-dark-navigation>
    <section class="news-hero wf-section">
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
            <div class="nav-link-text white">Company Blog Posts</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Blog</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="news-section-two wf-section">
      <div class="container">
        <div class="news-two-content">
          <div class="first-box-news">
            <div v-for="blog in blogs" :key="blog._id" class="each-news-set">
              <div class="news-header-top">
                <nuxt-link
                  :to="`/news-details/${blog._id}`"
                  class="mini-header"
                  >{{ blog.title }}</nuxt-link
                >
              </div>
              <div class="rows-icon-texts">
                <div class="first-icon-row">
                  <div class="set-icon">
                    <img
                      src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/648028cd37adfd5932f7b7dc_clock-svgrepo-com%20(2)%201.svg"
                      loading="lazy"
                      alt=""
                      class="set-time"
                    />
                    <div class="thick-light-text">
                      {{ formatDate(blog.time) }}
                    </div>
                  </div>
                  <div class="set-icon">
                    <div class="thick-light-text">
                      Posted by:<span class="thick"> {{ blog.author }}</span>
                    </div>
                  </div>
                  <div class="set-icon cut-short">
                    <div class="thick-light-text">
                      Category: Blockchain, Cryptocurrency
                    </div>
                  </div>
                </div>
                <div class="second-icon-row">
                  <div class="thick-light-text">
                    <a href="#" class="top-news-link">No Comments</a>
                  </div>
                </div>
              </div>
              <img
                :src="`${FILE_URL}/${blog.banner}`"
                loading="lazy"
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 90vw, (max-width: 991px) 92vw, (max-width: 1279px) 61vw, 69vw"
                :srcset="`
                  ${FILE_URL}/${blog.banner} 500w,
                  ${FILE_URL}/${blog.banner} 800w,
                  ${FILE_URL}/${blog.banner}       960w
                `"
                alt=""
                class="background-1"
              />
              <div class="news-text-holder">
                <div
                  class="mini-texts odd"
                  v-html="`${blog.content.substring(0, 200)}...`"
                ></div>
              </div>
              <nuxt-link
                :to="`/news-details/${blog._id}`"
                class="new-button-holder"
              >
                <div class="yellow-black-button">
                  <div class="button-header-holder">
                    <h5 class="yellow-slide-header black">More</h5>
                  </div>
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/646ca40b5abf546bdb737529_line-angle-right-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-11"
                  />
                </div>
              </nuxt-link>
            </div>
          </div>

          <aside-news />
        </div>
      </div>
    </section>
    <home-footer></home-footer>
  </div>
</template>

<script>
import AsideNews from "../components/AsideNews.vue";
import HomeDarkNavigation from "../components/HomeDarkNavigation.vue";
export default {
  data() {
    return {
      blogs: [],
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

    formatDate(data) {
      const date = new Date(data).getTime(); // Note that month is zero-indexed in JavaScript
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        suffix: (day) => {
          if (day === 1 || day === 21 || day === 31) {
            return "st";
          } else if (day === 2 || day === 22) {
            return "nd";
          } else if (day === 3 || day === 23) {
            return "rd";
          } else {
            return "th";
          }
        },
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    async getBlogs() {
      try {
        const result = await this.$axios.get("/blog");
        this.blogs = result.data.data;
        this.loadScript();
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  mounted() {
    this.getBlogs();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { HomeDarkNavigation, AsideNews },
};
</script>

<style>
a.first-link-header {
  text-decoration: none;
  color: black;
}

.new-button-holder,
.yellow-black-button {
  max-width: 150px;
}
</style>
