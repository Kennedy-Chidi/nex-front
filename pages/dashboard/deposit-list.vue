<template>
  <div class="deposit-list-holder deposit">
    <div class="deposit-list">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="deposit-list-second">
          <h1 class="main-heading ful">Deposit List</h1>
        </div>
        <div v-for="plan in plans" :key="plan._id" class="deposit-list-second">
          <div class="plan-header-holder dash">
            <h1 class="main-heading dash select">
              {{ capitalize(plan.planName) }}
            </h1>
          </div>

          <div class="table-plan-holder">
            <div class="table">
              <div class="main-table">
                <div class="light-table-holder table-green">
                  <div class="sn-holder">
                    <h1 class="table-header">S/N</h1>
                  </div>
                  <div class="table-transaction-holder">
                    <h1 class="table-header">Transactions</h1>
                  </div>
                  <div class="symbols">
                    <h1 class="table-header">Wallet</h1>
                  </div>
                  <div class="table-amount-holder">
                    <h1 class="table-header">Amounts</h1>
                  </div>
                  <div class="table-date-holder">
                    <h1 class="table-header">Dates</h1>
                  </div>
                </div>
                <div
                  v-for="(transaction, index) in getTransactions(plan.planName)"
                  :key="index"
                  class="light-table-holder"
                >
                  <div class="sn-holder">
                    <h1 class="table-header slash">S/N</h1>
                    <h1 class="table-header">{{ index + 1 }}.</h1>
                  </div>
                  <div class="table-transaction-holder">
                    <h1 class="table-header slash">Transactions</h1>
                    <h1 class="table-header">Deposit</h1>
                  </div>
                  <div class="symbols">
                    <h1 class="table-header slash">Symbols</h1>
                    <img
                      v-if="transaction.online"
                      :src="`${transaction.image}`"
                      loading="lazy"
                      alt=""
                      class="deposit-bitcoin slash"
                    />
                    <img
                      v-else
                      :src="`${FILE_URL}/${transaction.image}`"
                      loading="lazy"
                      alt=""
                      class="deposit-bitcoin slash"
                    />
                  </div>
                  <div class="table-amount-holder">
                    <h1 class="table-header slash">Amounts</h1>
                    <h1 class="table-header">
                      ${{ formatMoney(Number(transaction.amount).toFixed(2)) }}
                      USD
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
      plans: [],
      transactions: [],

      sort: "-time",
      limit: 10,
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
    capitalize(data) {
      return data.charAt(0).toUpperCase() + data.slice(1);
    },

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    getTransactions(name) {
      const filteredTransactions = this.transactions.filter(
        (transaction) => transaction.planName === name
      );

      return filteredTransactions.map((transaction) => {
        return transaction;
      });
    },

    paginate(int) {
      this.currentPage = int;
      this.getDeposits();
    },

    async getPlans() {
      try {
        const result = await this.$axios.get("/plans");
        this.plans = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getDeposits() {
      try {
        const result = await this.$axios.get(
          `/transactions/history/?transactionType=deposit&username=${this.user.username}&limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}`
        );
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },

  mounted() {
    this.getPlans();
    this.getDeposits();
  },

  computed: {
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
.table-green h1 {
  color: black;
}
</style>
