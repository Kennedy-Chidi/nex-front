<template>
  <div class="about">
    <home-dark-navigation></home-dark-navigation>
    <section class="about-section-one wf-section">
      <div class="container">
        <div class="about-one-content">
          <div class="top-nav-holder">
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
          <div class="top-flexer">
            <div class="about-first-ground">
              <div class="about-slider-holder">
                <div
                  data-delay="4000"
                  data-animation="slide"
                  class="w-slider"
                  data-autoplay="true"
                  data-easing="ease"
                  data-hide-arrows="false"
                  data-disable-swipe="false"
                  data-autoplay-limit="0"
                  data-nav-spacing="3"
                  data-duration="1000"
                  data-infinite="true"
                >
                  <div class="w-slider-mask">
                    <div class="slide w-slide">
                      <div class="slide-content-holder">
                        <div class="about-header-holder">
                          <h1 class="about-header">
                            Blockchain and Smart Contract
                          </h1>
                        </div>
                        <div class="slide-text-hold">
                          <div class="slide-thick-text">
                            Discover the power of Blockchain and Smart
                            Contracts, <br />revolutionizing industries with
                            secure and transparent transactions, <br />
                            streamlined processes, and unparalleled efficiency.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="slide-2 w-slide">
                      <div class="slides-content-holder">
                        <div class="slide-half-content">
                          <div class="about-header-holder">
                            <h1 class="about-header white">
                              Cloud Hosting and Crypto Mining
                            </h1>
                          </div>
                          <div class="slide-text-hold">
                            <div class="slide-thick-text">
                              Experience the power of Cloud Hosting for Crypto
                              Mining, <br />
                              harnessing the scalability, reliability, <br />
                              and cost-effectiveness of the cloud to maximize
                              your mining operations and optimize your crypto
                              earnings.
                            </div>
                          </div>
                        </div>
                        <div class="side-half-image">
                          <img
                            src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/647d3dce66a1b3328be9f59e_services_slider.png"
                            loading="lazy"
                            alt=""
                            class="image-28"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-arrow w-slider-arrow-left">
                    <div class="w-icon-slider-left"></div>
                  </div>
                  <div class="right-arrow w-slider-arrow-right">
                    <div class="w-icon-slider-right"></div>
                  </div>
                  <div class="w-slider-nav w-round"></div>
                </div>
              </div>
              <div class="slide-content-roll">
                <div class="top-header-hold">
                  <h1 class="about-header">
                    Nexia BT Holdings: Empowering Crypto Investments with Trust
                    and Returns
                  </h1>
                </div>
                <div class="text-content-holder first">
                  <div class="mini-texts" v-html="about.content"></div>
                </div>
              </div>
            </div>
            <div class="side-content">
              <div class="yellow-content-container">
                <div class="assit-text-holder">
                  <div class="assit-texts">How can we help you?</div>
                </div>
                <div class="mini-second-holder">
                  <div class="normal-text">
                    For more enquiries, kindly visit our FAQ to get quick
                    answers to your answered questions or contact us on our
                    contact page.
                  </div>
                </div>
                <nuxt-link to="/contact" class="white-box-holder">
                  <img
                    src="https://uploads-ssl.webflow.com/646abdec90d7a30035c56ac7/647e89b6380dce0e065ca41a_call-192-svgrepo-com%201.svg"
                    loading="lazy"
                    alt=""
                    class="image-31"
                  />
                  <div class="sub-mini-text">Contact</div>
                </nuxt-link>
              </div>

              <div class="img-message" v-if="review">
                <div class="text-space-holder">
                  <div class="mini-texts odd">
                    {{ review.comment }}
                  </div>
                </div>
              </div>
              <div class="about-profilr">
                <img
                  src="/favicon.ico"
                  loading="lazy"
                  alt=""
                  class="image-32"
                />
                <div class="texts-flexer">
                  <div class="top-text-flexer">
                    <h5 class="slider-head">{{ review.username }}</h5>
                  </div>
                  <div class="buttom-flex">
                    <div class="diiff-text">
                      Nexia BT Holdings Representative
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section-three wf-section">
      <div class="container">
        <div class="section-three-content">
          <div class="top-headlin-holder">
            <h1 class="sub-header">Our team</h1>
          </div>
          <div class="team-holder">
            <div
              v-for="staff in staffs"
              :key="staff._id"
              class="each-team w-inline-block"
            >
              <img
                :src="`${FILE_URL}/${staff.image}`"
                loading="lazy"
                alt=""
                class="image-33"
              />
              <div class="text-steps">
                <div class="text-step-one">
                  <h1 class="mini-header">{{ staff.name }}</h1>
                </div>
                <div class="text-step-two">
                  <div class="home-time-text extra">{{ staff.position }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <profit />
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeDarkNavigation from "../components/HomeDarkNavigation.vue";
import profit from "../components/profit.vue";
export default {
  data() {
    return {
      about: "",
      staffs: [],
      review: "",
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

    async getStaffs() {
      try {
        const result = await this.$axios.get(`/staffs`);
        this.staffs = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getReviews() {
      try {
        const result = await this.$axios.get("/review/?commented=true");
        this.review = result.data.data[0];
        this.loadScript();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getAbout() {
      try {
        const result = await this.$axios.get(`/about`);
        this.about = result.data.data[0];
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getAbout();
    this.getStaffs();
    this.getReviews();
    this.loadScript();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { HomeDarkNavigation, profit },
};
</script>

<style></style>
