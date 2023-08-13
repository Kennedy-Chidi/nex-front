<template>
  <div class="deposit-holde">
    <div class="deposit">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="doposit-balance-holder">
          <div class="balance-top-header">
            <div class="balance-header-holder">
              <h1 class="main-heading">Referral</h1>
            </div>
            <div class="balance-text-holder">
              <h1 class="sub-heading">Referral Statistics</h1>
            </div>
          </div>

          <div class="short-card-holder currency">
            <div class="each-short-card">
              <div class="short-top">
                <div class="short-side-contents">
                  <div class="main-header-holder">
                    <h1 class="main-header">Total Referrals</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        {{ userReferrals }}
                      </div>
                    </div>
                    <img
                      src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a18f57e24b363fc634e5_link-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="image-18"
                    />
                  </div>
                </div>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460c1d4a33287e54e7f42b8_bank-finance-loan-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-icon-1"
                />
              </div>
              <div class="short-down">
                <h1 class="sub-heading">
                  {{ userReferrals }}
                </h1>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a130bc4ac1a632474a5d_3-vertical-dots-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="image-17"
                />
              </div>
            </div>

            <div class="each-short-card">
              <div class="short-top">
                <div class="short-side-contents">
                  <div class="main-header-holder">
                    <h1 class="main-header">Active Referral</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        {{ activeReferrals }}
                      </div>
                    </div>
                    <img
                      src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a18f57e24b363fc634e5_link-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="image-18"
                    />
                  </div>
                </div>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a9798e9cf5a7506b6a92_bank-deposit-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-icon-2"
                />
              </div>
              <div class="short-down">
                <h1 class="sub-heading">
                  {{ activeReferrals }}
                </h1>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a130bc4ac1a632474a5d_3-vertical-dots-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="image-17"
                />
              </div>
            </div>

            <div class="each-short-card">
              <div class="short-top">
                <div class="short-side-contents">
                  <div class="main-header-holder">
                    <h1 class="main-header">Total Commission</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        ${{ formatMoney(commission) }} USD
                      </div>
                    </div>
                    <img
                      src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a18f57e24b363fc634e5_link-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="image-18"
                    />
                  </div>
                </div>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432aa19545aff9c57e93057_wallet-to-bank-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-icon-3"
                />
              </div>
              <div class="short-down">
                <h1 class="sub-heading">${{ formatMoney(commission) }} USD</h1>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a130bc4ac1a632474a5d_3-vertical-dots-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="image-17"
                />
              </div>
            </div>
          </div>

          <div class="scan-div">
            <div class="scan-toptext-holder">
              <div class="down-logo-texts">You can scan the code below.</div>
            </div>
            <div id="qrcode"></div>
            <div class="scan-toptext-holder down">
              <div class="down-logo-texts">
                Or copy the referral link below.
              </div>
            </div>

            <div class="input-upload-holder">
              <div class="scan-form w-form">
                <div class="over-flow">
                  <div class="upload-address-holder">
                    <input
                      type="text"
                      class="text-field-2 w-input"
                      maxlength="256"
                      name="name-3"
                      :value="`${url}/signup?username=${user.username}`"
                      data-name="Name 3"
                      placeholder="Wallleaddress"
                      id="walletAddress"
                    />
                    <div class="upload-icon-holder">
                      <img
                        src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/64375ec4b5653e1a0ca9ab21_copy-link-icon%202.svg"
                        loading="lazy"
                        alt=""
                        class="copied-icon"
                        @click="copyInputValue"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="history-table">
            <div class="table">
              <div class="main-table">
                <div class="light-table-holder table-green">
                  <div class="sn-holder head">
                    <h1 class="table-header">S/N</h1>
                  </div>
                  <div class="table-transaction-holder">
                    <h1 class="table-header head">Username</h1>
                  </div>
                  <div class="symbols">
                    <h1 class="table-header head">Amount</h1>
                  </div>
                  <div class="table-amount-holder">
                    <h1 class="table-header head">Time</h1>
                  </div>
                  <div class="table-date-holder">
                    <h1 class="table-header head">Dates</h1>
                  </div>
                </div>
                <div
                  v-for="(referral, index) in referrals"
                  :key="index"
                  class="light-table-holder"
                >
                  <div class="sn-holder">
                    <h1 class="table-header slash">S/N</h1>
                    <h1 class="table-header">{{ index + 1 }}.</h1>
                  </div>
                  <div class="table-transaction-holder">
                    <h1 class="table-header slash">Username</h1>
                    <h1 class="table-header">
                      {{ referral.username }}
                    </h1>
                  </div>
                  <div class="symbols">
                    <h1 class="table-header slash">Amount</h1>
                    <h1 class="table-header">
                      {{ referral.commission }}
                    </h1>
                  </div>
                  <div class="table-amount-holder">
                    <h1 class="table-header slash">Time</h1>
                    <h1 class="table-header">
                      {{ getTime(referral.time) }}
                    </h1>
                  </div>
                  <div class="table-date-holder">
                    <h1 class="table-header slash">Dates</h1>
                    <h1 class="table-header">
                      {{ formatDate(referral.time) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul v-if="pages().length > 1" role="list" class="paginantion">
            <li
              v-if="currentPage != 1"
              @click="paginate(currentPage - 1)"
              class="each-page"
            >
              <img
                src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460e62ee8f19be93c559bde_arrow-thin-chevron-left-icon%201.svg"
                loading="lazy"
                alt=""
                class="paginate-icon"
              />
            </li>
            <li
              @click="paginate(int + 1)"
              :class="{
                active: int == currentPage - 1,
                hide: int >= 3 + currentPage || int < currentPage - 3,
                show: int + 1 == pages().length,
              }"
              v-for="(page, int) in pages().length"
              :key="int"
              class="each-page"
            >
              <div>{{ int + 1 }}</div>
            </li>

            <li
              class="each-page"
              v-if="currentPage < pages(currentPage + 1).length"
              @click="paginate(currentPage + 1)"
            >
              <img
                src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6460e62d60f21622a52c68e0_arrow-thin-chevron-left-icon%202.svg"
                loading="lazy"
                alt=""
                class="paginate-icon"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <dashboard-footer />
  </div>
</template>

<script>
import DashboardFooter from "../../components/DasboardCompontents/DashboardFooter.vue";
import DashboardHeader from "../../components/DasboardCompontents/DashboardHeader.vue";
import DashboardNavigation from "../../components/DasboardCompontents/DashboardNavigation.vue";
export default {
  data() {
    return {
      userReferrals: "",
      company: "",
      img: "",
      url: "",
      qrcodeSize: 200,
      referrals: [],
      commission: 0,
      activeReferrals: 0,

      limit: 5,
      sort: "-time",
      itemLength: "",
      currentPage: 1,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.itemLength / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
    };
  },

  methods: {
    copyInputValue() {
      const inputElement = document.getElementById("walletAddress");
      inputElement.select();
      document.execCommand("copy");
    },

    generateCode() {
      const qrContainer = document.getElementById("qrcode");
      const size = 200;
      const str = `${this.url}/signup?username=${this.user.username}`;
      const googleChartsApiUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${str}`;

      const img = new Image();
      img.src = googleChartsApiUrl;
      img.width = size;
      img.height = size;
      qrContainer.appendChild(img);
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

    getTime(data) {
      if (!data) {
        return "Not Available";
      }
      var timeString = new Date(data).toLocaleTimeString();
      var hours = new Date(data).getHours();
      var suffix = hours >= 12 ? "PM" : "AM";

      return timeString + " " + suffix;
    },

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    selectFrom(e) {
      this.from = new Date(e.target.value).getTime();
      this.getHistory();
    },

    selectTo(e) {
      this.to = new Date(e.target.value).getTime();
      this.getHistory();
    },

    setUserReferrals(data) {
      let number = 0;
      data.forEach((el) => {
        if (el.commission == 0) {
          number++;
        }
      });
      return number;
    },

    setCommission(data) {
      data.forEach((el) => {
        this.commission += el.commission;
      });
    },

    paginate(int) {
      this.currentPage = int;
      this.getReferrals();
    },

    setReferrals(data) {
      const array = [];
      data.forEach((el) => {
        if (el.commission > 0) {
          array.push(el);
        }
      });
      return array;
    },

    async getReferrals() {
      const query = `?username=${this.user.username}&page=${this.currentPage}&limit=${this.limit}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/referrals/${query}`);
        this.userReferrals = this.setUserReferrals(result.data.data);
        this.setCommission(result.data.data);
        this.referrals = this.setReferrals(result.data.data);
        this.itemLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getActive() {
      try {
        const result = await this.$axios.get(
          `/transactions/active-deposits/?referredBy=${this.user.username}`
        );
        this.activeReferrals = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.url = result.data.data.companyDomain;
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },

  mounted() {
    this.getCompany();
    this.getActive();
    this.generateCode();
    // this.authenticateUser();
    this.getReferrals();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.state.auth.user;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  components: { DashboardNavigation, DashboardHeader, DashboardFooter },
};
</script>

<style>
.short-card-holder.currency {
  display: flex;
  flex-wrap: wrap;
}

.short-card-holder.currency > div {
  margin-bottom: 20px;
}

.text-field.w-input {
  color: white;
  background: transparent;
}
</style>
