<template>
  <div class="main-wrapper transaction">
    <admin-navigation />
    <div class="body-wrapper">
      <admin-top-header />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <h4 class="page-title">TRANSACTION HISTORY</h4>
          <div class="table-wrapper">
            <table class="custom-table">
              <thead>
                <tr>
                  <td>S/N</td>
                  <td>Username</td>
                  <td>Currency</td>
                  <td>Wallet</td>
                  <td>Amount</td>
                  <td>Plan</td>
                  <td>Duration</td>
                  <td>Remaining</td>
                  <td>Earning</td>
                  <td>Date</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, int) in transactions"
                  :key="transaction._id"
                >
                  <td>{{ int + 1 }}</td>
                  <td>{{ transaction.username }}</td>
                  <td>
                    <img
                      v-if="transaction.online"
                      :src="`${transaction.image}`"
                      alt=""
                      class="banner symbol"
                    />
                    <img
                      v-else
                      :src="`${FILE_URL}/${transaction.image}`"
                      alt=""
                      class="banner symbol"
                    />
                  </td>
                  <td>{{ transaction.walletName }}</td>
                  <td>${{ formatMoney(transaction.amount) }}</td>
                  <td>{{ transaction.planName }}</td>
                  <td>{{ getDuration(transaction.planDuration) }} days</td>
                  <td>
                    {{ Math.ceil(getDuration(transaction.daysRemaining)) }} days
                  </td>
                  <td>
                    <span v-if="transaction.earning > 0">
                      ${{ transaction.earning }}
                    </span>
                    <span v-else>$0</span>
                  </td>
                  <td>
                    {{ formatDate(transaction.time) }} <br />
                    {{ getTime(transaction.time) }}
                  </td>

                  <td>
                    <div
                      @click="continueEarning(transaction)"
                      class="status success"
                    >
                      Continue
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-label">
            <div>
              <strong class="bold-text">Results</strong>: {{ resultLength }}
              <strong class="bold-text-2">Page</strong> {{ currentPage }} of
              {{ pages().length }}
            </div>
            <ul
              v-if="pages().length > 1"
              role="list"
              class="min-table-pagination"
            >
              <li
                v-if="currentPage != 1"
                @click="paginate(currentPage - 1)"
                class="pagination-item"
              >
                <img
                  src="/admin-images/cheveron-left.svg"
                  loading="lazy"
                  alt=""
                  class="pagination-img"
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
                class="pagination-item"
              >
                <div>{{ int + 1 }}</div>
              </li>
              <li
                v-if="currentPage < pages(currentPage + 1).length"
                @click="paginate(currentPage + 1)"
                class="pagination-item"
              >
                <img
                  src="/admin-images/cheveron-right.svg"
                  loading="lazy"
                  alt=""
                  class="pagination-img"
                />
              </li>
            </ul>
          </div>
        </div>
        <Instruction />
      </div>
      <admin-footer />
    </div>
  </div>
</template>

<script>
import AdminFooter from "../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../components/AdminComponents/AdminNavigation.vue";
import AdminTopHeader from "../../components/AdminComponents/AdminTopHeader.vue";
import AdminConfirmation from "../../components/AdminComponents/AdminConfirmation.vue";
import Instruction from "../../components/AdminComponents/Instruction.vue";

export default {
  data() {
    return {
      transactions: [],
      transaction: "",
      narration: "",
      amount: "",
      dateTime: "",
      company: "",

      sort: "-time",
      field: "",
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
    getTime(data) {
      if (!data) {
        return "Not Available";
      }
      return new Date(data).toLocaleTimeString();
    },

    paginate(page) {
      this.currentPage = page;
      this.getActiveDeposits();
    },

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    getDuration(data) {
      if (!data) {
        return "N/A";
      } else {
        return data / (24 * 60 * 60 * 1000);
      }
    },

    formatDate(data) {
      if (!data) {
        return "Not Available";
      }
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

    async continueEarning(transaction) {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}`;
      const form = {
        time: new Date().getTime(),
      };
      try {
        const result = await this.$axios.patch(
          `/transactions/continue-earnings/${transaction._id}/${query}`,
          form
        );
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getActiveDeposits() {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.get(
          `/transactions/active-deposits/${query}`
        );
        this.transactions = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = result.data.data[0];
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },

  mounted() {
    this.getActiveDeposits();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: {
    Instruction,
    AdminConfirmation,
    AdminFooter,
    AdminTopHeader,
    AdminNavigation,
  },
};
</script>

<style>
.banner.symbol {
  height: 35px;
  width: auto;
}
</style>
