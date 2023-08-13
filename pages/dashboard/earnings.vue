<template>
  <div class="history">
    <div class="transaction-history deposit">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="history-header-holder">
          <h1 class="main-heading">Earning History</h1>
        </div>

        <div class="history-table">
          <div class="table">
            <div class="main-table">
              <div class="light-table-holder table-green">
                <div class="sn-holder head">
                  <h1 class="table-header">S/N</h1>
                </div>
                <div class="table-transaction-holder">
                  <h1 class="table-header head">Currency</h1>
                </div>
                <div class="symbols">
                  <h1 class="table-header head">Wallet</h1>
                </div>
                <div class="table-amount-holder">
                  <h1 class="table-header head">Amounts</h1>
                </div>
                <div class="table-date-holder">
                  <h1 class="table-header head">Dates</h1>
                </div>
              </div>
              <div
                v-for="(transaction, index) in approvedTransactions"
                :key="index"
                class="light-table-holder"
              >
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">{{ index + 1 }}.</h1>
                </div>
                <div class="table-transaction-holder">
                  <h1 class="table-header slash">Currency</h1>
                  <h1 class="table-header">
                    {{ capitalizeWord(transaction.walletName) }}
                  </h1>
                </div>
                <div class="symbols">
                  <h1 class="table-header slash">Symbols</h1>
                  <img
                    :src="`${FILE_URL}/${transaction.symbol}`"
                    loading="lazy"
                    alt=""
                    class="deposit-bitcoin slash"
                  />
                </div>
                <div class="table-amount-holder">
                  <h1 class="table-header slash">Amounts</h1>
                  <h1 class="table-header">
                    ${{ formatMoney(Number(transaction.amount)) }} USD
                  </h1>
                </div>
                <div class="table-date-holder">
                  <h1 class="table-header slash">Dates</h1>
                  <h1 class="table-header">
                    {{ getTime(transaction.time) }} ||
                    {{ formatDate(transaction.time) }}
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
      approvedTransactions: [],
      company: "",
      earnings: [],

      sort: "-time",
      limit: 5,
      resultLength: "",
      currentPage: 1,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.resultLength / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
    };
  },

  methods: {
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

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    capitalizeWord(data) {
      return data.charAt(0).toUpperCase() + data.slice(1);
    },

    getTime(data) {
      if (data == "" || data == null) {
        return "00:00";
      }
      const currentDate = new Date(data);
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let amOrPm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;

      minutes = minutes < 10 ? "0" + minutes : minutes;

      return hours + ":" + minutes + " " + amOrPm;
    },

    paginate(int) {
      this.currentPage = int;
      this.getEarnings();
    },

    async getEarnings() {
      try {
        const result = await this.$axios.get(
          `/transactions/earnings/?username=${this.user.username}&sort=${this.sort}&limit=${this.limit}&page=${this.currentPage}`
        );
        this.earnings = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  mounted() {
    this.getEarnings();
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  components: { DashboardHeader, DashboardNavigation, DashboardFooter },
};
</script>

<style></style>
