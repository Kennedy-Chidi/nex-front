<template>
  <div class="dashboard-holde">
    <div class="dashboard">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="card-holder">
          <div class="top-card-one">
            <div class="circle-bg">
              <div class="card-top-holder">
                <div class="black-text">Total</div>
                <div class="black-text">Balance</div>
              </div>
              <div class="middle-holder">
                <div class="middle-side-content">
                  <div class="sub-heading-holder">
                    <h1 class="sub-heading">Total Balance</h1>
                  </div>
                  <div class="sub-text-holder">
                    <div class="sub-text" v-if="user">
                      {{ user.firstName }} {{ user.lastName }}
                    </div>
                  </div>
                </div>
                <div class="thick-header-holder">
                  <h1 class="thick-header">
                    <span class="text-span"
                      >{{
                        formatMoney(Number(user.totalBalance).toFixed(2))
                      }}
                      $</span
                    >
                  </h1>
                </div>
              </div>
              <div class="card-button-holder">
                <nuxt-link
                  to="/dashboard/deposit"
                  class="transact-button w-button"
                  >Deposit</nuxt-link
                ><nuxt-link
                  to="/dashboard/withdraw-funds"
                  class="depositing-button w-button"
                  >Withdraw</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="top-card-two">
            <div class="top-card-cover">
              <div class="card-header-holder">
                <h1 class="card-header">From {{ company.companName }}</h1>
              </div>
              <div class="card-texts-holder">
                <div class="card-text">
                  We are saying a big Welcome & Thanks for <br />
                  making us your best option of profitable investment. <br />
                  Wishing your profit each day you visit us.
                </div>
              </div>
              <nuxt-link to="/about" class="green-card-button w-button"
                >About Us</nuxt-link
              >
            </div>
          </div>
        </div>
        <div class="short-card-hold">
          <div class="short-card-holder">
            <div class="each-short-card">
              <div class="short-top">
                <div class="short-side-contents">
                  <div class="main-header-holder">
                    <h1 class="main-header">Total Deposit</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        ${{ formatMoney(Number(totalDeposit).toFixed(2)) }} USD
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
                  ${{ formatMoney(Number(totalDeposit).toFixed(2)) }} USD
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
                    <h1 class="main-header">Active Deposit</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        ${{ formatMoney(Number(activeDeposit).toFixed(2)) }} USD
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
                  ${{ formatMoney(Number(activeDeposit).toFixed(2)) }} USD
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
                    <h1 class="main-header">Pending Withdrawal</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        ${{ formatMoney(Number(pendingWithdrawal).toFixed(2)) }}
                        USD
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
                <h1 class="sub-heading">
                  ${{ formatMoney(Number(pendingWithdrawal).toFixed(2)) }} USD
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
                    <h1 class="main-header">Total Withdrawal</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <div class="main-text">
                        ${{ formatMoney(Number(totalWithdrawal).toFixed(2)) }}
                        USD
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
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a0d33f44a712b0638355_finance-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-icon-4"
                />
              </div>
              <div class="short-down">
                <h1 class="sub-heading">
                  ${{ formatMoney(Number(totalWithdrawal).toFixed(2)) }} USD
                </h1>
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a130bc4ac1a632474a5d_3-vertical-dots-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="image-17"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="details-holder">
          <div class="first-table-container">
            <div class="table">
              <div class="details-top-holder">
                <div class="details-texts-holder">
                  <div class="main-header">Latest Transaction</div>
                </div>
              </div>
              <div class="main-table">
                <div class="light-table-holder table-green">
                  <div class="sn-holder head">
                    <h1 class="table-header">S/N</h1>
                  </div>
                  <div class="table-transaction-holder">
                    <h1 class="table-header head">Transactions</h1>
                  </div>
                  <div class="symbols">
                    <h1 class="table-header head">Currency</h1>
                  </div>
                  <div class="table-amount-holder">
                    <h1 class="table-header head">Amounts</h1>
                  </div>
                  <div class="table-date-holder">
                    <h1 class="table-header head">Dates</h1>
                  </div>
                </div>
                <div
                  v-for="(transaction, index) in transactions"
                  :key="transaction._id"
                  class="light-table-holder"
                >
                  <div class="sn-holder">
                    <h1 class="table-header slash">S/N</h1>
                    <h1 class="table-header">{{ index + 1 }}.</h1>
                  </div>
                  <div class="table-transaction-holder">
                    <h1 class="table-header slash">Transactions</h1>
                    <h1 class="table-header">
                      {{ capitalizeWord(transaction.transactionType) }}
                    </h1>
                  </div>
                  <div class="symbols">
                    <h1 class="table-header slash">Currency</h1>
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
                      {{ formatDate(transaction.time) }}
                    </h1>
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
          <div class="details-two">
            <div class="details-top-holder">
              <div class="details-texts-holder">
                <div class="main-header light">Total Volume</div>
              </div>
            </div>
            <div class="day-holder">
              <div class="each-day active">
                <div class="day-top-holder">
                  <div class="day-text-holder">
                    <div class="main-text">Deposit</div>
                  </div>
                  <div class="day-header-holder">
                    <h1 class="main-header total">
                      ${{ formatMoney(Number(totalDeposit).toFixed(2)) }} USD
                    </h1>
                  </div>
                </div>
              </div>
              <div class="each-day">
                <div class="day-top-holder">
                  <div class="day-text-holder">
                    <div class="main-text">Withdrawal</div>
                  </div>
                  <div class="day-header-holder">
                    <h1 class="main-header total">
                      ${{ formatMoney(Number(totalWithdrawal).toFixed(2)) }} USD
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
      totalDeposit: "",
      totalWithdrawal: "",
      activeDeposit: "",
      pendingWithdrawal: "",
      approvedTransactions: [],

      transactions: [],
      user: "",
      company: "",

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

    getVolumes(data) {
      data.forEach((el) => {
        if (el._id == "withdrawal") {
          this.withdrawal = el.volume;
        } else {
          this.deposit = el.volume;
        }
      });
    },

    getActive(data) {
      if (data.length == 0) {
        return 0;
      } else {
        let money = 0;
        data.forEach((el) => {
          money += el.amount;
        });
        return money;
      }
    },

    getApprovedTransactions(data) {
      if (data.length == 0) {
        return 0;
      } else {
        let TX = [];
        data.forEach((el) => {
          if (el.status == true) {
            TX.push(el);
          }
        });

        return TX;
      }
    },

    getPendingWithdrawal(data) {
      if (data.length == 0) {
        return 0;
      } else {
        let money = 0;
        data.forEach((el) => {
          money += el.pendingWithdrawal;
        });

        return money;
      }
    },

    getTotalWithdrawal(data) {
      if (data.length == 0) {
        return 0;
      } else {
        let money = 0;
        data.forEach((el) => {
          money += el.totalWithdrawal;
        });

        return money;
      }
    },

    getTotalDeposit(data) {
      if (data.length == 0) {
        return 0;
      } else {
        let money = 0;
        data.forEach((el) => {
          money += el.totalDeposit * 1;
        });

        return money;
      }
    },

    paginate(page) {
      this.currentPage = page;
      this.getTransactions();
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = await result.data.data;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async getWallets() {
      try {
        const result = await this.$axios.get(
          `/wallet/?username=${this.user.username}`
        );
        this.totalDeposit = this.getTotalDeposit(await result.data.data);
        this.totalWithdrawal = this.getTotalWithdrawal(await result.data.data);
        this.pendingWithdrawal = this.getPendingWithdrawal(
          await result.data.data
        );
        this.wallets = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },

    async getActiveDeposit() {
      try {
        const result = await this.$axios.get(
          `/transactions/active-deposits/?username=${this.user.username}&limit=60`
        );
        this.activeDeposit = this.getActive(result.data.data);
      } catch (err) {
        console.log(err.response);
      }
    },

    async getTransactions() {
      const query = `?username=${this.user.username}&limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.get(`/transactions/history/${query}`);
        this.approvedTransactions = this.getApprovedTransactions(
          result.data.data
        );
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getAUser() {
      try {
        const result = await this.$axios.get(`/users/get-user`);
        this.user = result.data.user;
        this.getTransactions();
        this.getActiveDeposit();
        this.getWallets();
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  mounted() {
    this.getAUser();
    this.getCompany();
  },

  computed: {
    authUser() {
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
.image-18 {
  width: 8px;
}
</style>
