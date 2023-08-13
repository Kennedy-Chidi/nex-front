<template>
  <div class="plan">
    <home-dark-navigation></home-dark-navigation>
    <section class="plan-hero wf-section">
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
            <div class="nav-link-text white">plan</div>
          </div>
          <div class="news-head-holder">
            <h1 class="section-head off">Plans</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="plan-section-two wf-section">
      <div class="container">
        <div class="plan-two-content">
          <div class="plan-header-holder">
            <h1 class="section-head toper">Our Affordable Investment Plans</h1>
          </div>
          <div class="text-plan-holder">
            <div class="hero-text">
              We have provided for you our list of affordable investment plans,
              kindly<br />
              choose the plan that best suits your budget and target for the
              year.<br />
            </div>
          </div>
          <div class="plan-card-swicther">
            <div v-for="plan in plans" :key="plan._id" class="each-card">
              <div class="top-plan-holder">
                <h1 class="section-head off">{{ plan.planName }}</h1>
              </div>
              <div class="each-text-holder">
                <div class="plan-text">Customer&#x27;s Reach &amp; Budget</div>
              </div>
              <div class="plan-mini-holder">
                <div class="hero-text less">MINIMUM</div>
              </div>
              <div class="top-percent-holder combo">
                <h1 class="percent-header">
                  ${{ plan.planMinimum }}.<span class="less-header">00</span>
                  USD
                </h1>
              </div>
              <div class="little-holder">
                <div class="thick-light-text off">
                  was: ${{ plan.planMinimum + 100 }}
                </div>
              </div>
              <div class="percent-holder">
                <h1 class="percent-header off">
                  {{ plan.planPercentage }}%<span class="less-header"></span>
                </h1>
                <div class="stroke-plan"></div>
                <div class="style-texts">
                  Daily For {{ plan.planDuration }} Days
                </div>
              </div>
              <div class="plan-mini-holder">
                <div class="hero-text less">MAXIMUM</div>
              </div>
              <div class="top-percent-holder">
                <h1 v-if="plan.planMaximum < 1" class="percent-header">
                  UNLIMITED
                </h1>
                <h1 v-else class="percent-header">
                  ${{ plan.planMaximum }}.<span class="less-header">00</span>
                  USD
                </h1>
              </div>
              <div class="little-holder">
                <div class="thick-light-text off">CURRENTLY : AFFORDABLE</div>
              </div>
              <div class="invest-button-holder">
                <div class="invest-button">
                  <nuxt-link to="/login" class="button-text"
                    >Invest Now</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <testimonial />
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeDarkNavigation from "../components/HomeDarkNavigation.vue";
import Testimonial from "../components/Testimonial.vue";
export default {
  data() {
    return {
      plans: [],
      banner: "",
    };
  },

  methods: {
    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    async getBanner() {
      try {
        const result = await this.$axios.get(
          `/banner/?bannerCategory=Services`
        );
        this.banner = result.data.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async getPlans() {
      try {
        const result = await this.$axios.get("/plans");
        this.plans = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  mounted() {
    this.getPlans();
    this.getBanner();
  },
  components: { HomeDarkNavigation, Testimonial },
};
</script>

<style></style>
