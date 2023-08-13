<template>
  <section class="plan-section-three wf-section">
    <div class="container">
      <div class="home-eight-content">
        <div class="top-highlight-holder">
          <div class="hash-header-holder">
            <h4 class="small-header off-white">Our Reviews<br /></h4>
          </div>
          <div class="section-head-holder">
            <h1 class="section-head">CLIENTS REVIEWS</h1>
          </div>
          <div class="top-icon-holder">
            <img
              src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/646b3e22d9c8a8dbd42ab80c_Ico-hero-icon.svg"
              loading="lazy"
              alt=""
              class="section-top-icon"
            />
          </div>
        </div>
        <div class="comment-area">
          <div class="qoute-holder">
            <img
              src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/646e661342680288efd8282a_quote-right-icon%201.svg"
              loading="lazy"
              alt=""
              class="image-13"
            />
          </div>
          <div class="home-slider-content">
            <div
              data-delay="4000"
              data-animation="slide"
              class="home-slider w-slider"
              data-autoplay="false"
              data-easing="ease"
              data-hide-arrows="false"
              data-disable-swipe="false"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="500"
              data-infinite="true"
            >
              <div class="w-slider-mask">
                <div
                  v-for="review in reviews"
                  :key="review._id"
                  class="home-slide w-slide"
                >
                  <div class="home-slide-content">
                    <div class="home-text-slide">
                      <div class="hero-text black">
                        {{ review.comment }}
                      </div>
                    </div>
                    <div class="home-slide-page">
                      <div class="slide-header-holder">
                        <h5 class="slider-head">{{ review.username }}</h5>
                      </div>
                      <div class="slider-text-holder">
                        <div class="diiff-text">
                          Nexia BT Holdings Representative
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-slider-arrow-left">
                <div class="icon-2 w-icon-slider-left"></div>
              </div>
              <div class="w-slider-arrow-right">
                <div class="icon-3 w-icon-slider-right"></div>
              </div>
              <div class="w-slider-nav w-slider-nav-invert w-round"></div>
            </div>
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
      reviews: [],
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

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    async getReviews() {
      try {
        const result = await this.$axios.get("/review/?commented=true");
        this.reviews = result.data.data;
        this.loadScript();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getReviews();
  },
};
</script>

<style></style>
