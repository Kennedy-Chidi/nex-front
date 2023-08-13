<template>
  <div class="main-wrapper transaction">
    <admin-confirmation
      :msg="confirmMessage"
      :state="confirmState"
      @confirm="returnConfirmation"
    />
    <admin-navigation />
    <div class="body-wrapper">
      <admin-top-header />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <h4 class="page-title">TRANSACTION HISTORY</h4>
          <div class="table-filters">
            <div class="each-filter-option">
              <img
                src="/admin-images/caret-down-gray.svg"
                loading="lazy"
                alt=""
                class="filter-icon drop"
                @click="hideTransactionFilter = !hideTransactionFilter"
              />
              <h4
                @click="hideTransactionFilter = !hideTransactionFilter"
                class="filter-label"
              >
                {{ transactionFilter }}
              </h4>
              <ul
                role="list"
                class="filter-list"
                :class="{ hide: hideTransactionFilter }"
              >
                <li
                  v-for="(filter, int) in transactionFilters"
                  :key="int"
                  class="filter-items"
                  @click="filterTransaction(filter)"
                >
                  <div>{{ filter }}</div>
                </li>
              </ul>
            </div>

            <div class="each-filter-option">
              <div class="filter-page">Sort</div>
              <h4 class="filter-label">Name</h4>
              <ul role="list" class="filter-list hide">
                <li class="filter-items"><div>Reg. Date</div></li>
                <li class="filter-items"><div>Deposit</div></li>
                <li class="filter-items"><div>Suspended</div></li>
                <li class="filter-items"><div>Blocked</div></li>
              </ul>
              <img
                src="/admin-images/caret-down-gray.svg"
                loading="lazy"
                alt=""
                class="filter-icon drop"
              />
            </div>
          </div>
          <div class="table-wrapper">
            <table class="custom-table">
              <thead>
                <tr>
                  <td>S/N</td>
                  <td>Username</td>
                  <td>Image</td>
                  <td>Wallet</td>
                  <td>Amount</td>
                  <td>Transaction</td>
                  <td>Plan</td>
                  <td>Duration</td>
                  <td>Date</td>
                  <td>Status</td>
                  <td>Action</td>
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
                  <td>{{ transaction.transactionType }}</td>
                  <td>{{ transaction.planName }}</td>
                  <td>{{ transaction.planDuration }} days</td>
                  <td>
                    {{ formatDate(transaction.time) }} <br />
                    {{ getTime(transaction.time) }}
                  </td>
                  <td>
                    <div class="status success" v-if="transaction.status">
                      Approved
                    </div>
                    <div
                      @click="startAproveTransaction(transaction)"
                      class="status"
                      v-else
                    >
                      Pending
                    </div>
                  </td>
                  <td>
                    <div
                      class="filter-box"
                      @click="prepareTransactionEdit(transaction)"
                    >
                      <img
                        src="/admin-images/edit-gray.svg"
                        loading="lazy"
                        alt=""
                        class="filter-icon check action-icon"
                      />
                    </div>
                    <div
                      class="filter-box"
                      @click="
                        deleteConfirmation(
                          'Are you sure you want to delete this transaction?',
                          transaction._id
                        )
                      "
                    >
                      <img
                        src="/admin-images/delete-gray.svg"
                        loading="lazy"
                        alt=""
                        class="filter-icon check action-icon"
                      />
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
          <div v-if="showEditButton" class="input-wrapper w-form">
            <div class="input-form">
              <div class="each-input">
                <label for="name-4" class="input-label"
                  >Transaction for {{ user.username }}</label
                >
                <h4
                  class="select-display"
                  @click="showTransactionList = !showTransactionList"
                >
                  {{ transactionType }}
                </h4>
                <ul
                  role="list"
                  class="filter-list down"
                  :class="{ hide: !showTransactionList }"
                >
                  <li
                    class="filter-items"
                    v-for="(item, i) in transactionTypes"
                    :key="i"
                  >
                    <div @click="selectTransaction(item)">
                      {{ item }}
                    </div>
                  </li>
                </ul>
                <img
                  @click="showTransactionList = !showTransactionList"
                  src="/admin-images/caret-down-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon middle"
                />
              </div>

              <div class="each-input">
                <label for="name-4" class="input-label">Wallet</label>
                <h4
                  class="select-display"
                  @click="showWalletList = !showWalletList"
                >
                  {{ walletType }}
                </h4>
                <ul
                  role="list"
                  class="filter-list down"
                  :class="{ hide: !showWalletList }"
                >
                  <li
                    class="filter-items"
                    v-for="(item, i) in walletTypes"
                    :key="i"
                  >
                    <div @click="selectWallet(item)">
                      {{ item.name }}
                    </div>
                  </li>
                </ul>
                <img
                  @click="showWalletList = !showWalletList"
                  src="/admin-images/caret-down-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon middle"
                />
              </div>

              <div class="each-input">
                <label for="name-4" class="input-label">Plan</label>
                <h4
                  class="select-display"
                  @click="showPlanList = !showPlanList"
                >
                  {{ planType }}
                </h4>
                <ul
                  role="list"
                  class="filter-list down"
                  :class="{ hide: !showPlanList }"
                >
                  <li
                    class="filter-items"
                    v-for="(item, i) in planTypes"
                    :key="i"
                  >
                    <div @click="selectPlan(item)">
                      {{ item.planName }}
                    </div>
                  </li>
                </ul>
                <img
                  @click="showPlanList = !showPlanList"
                  src="/admin-images/caret-down-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon middle"
                />
              </div>

              <div class="each-input">
                <label for="email-3" class="input-label"
                  >Amount<span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  v-model="amount"
                />
              </div>

              <div class="each-input">
                <label for="email-3" class="input-label"
                  >Date Time<span class="important">*</span></label
                ><input
                  type="datetime-local"
                  class="plan-input w-input"
                  v-model="dateTime"
                />
              </div>

              <div
                class="response"
                v-if="showResponse"
                :class="{ success: responseState }"
              >
                {{ response }}
              </div>
              <div class="button-holder">
                <input
                  type="button"
                  value="Create Transaction"
                  @click="processTransaction"
                  class="button w-button"
                /><input
                  type="submit"
                  value="Cancel"
                  data-wait="Please wait..."
                  class="button w-button"
                />
              </div>
            </div>
          </div>
        </div>
        <Instruction />
      </div>
      <admin-footer />
    </div>
  </div>
</template>

<script>
import AdminFooter from "../../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../../components/AdminComponents/AdminNavigation.vue";
import AdminTopHeader from "../../../components/AdminComponents/AdminTopHeader.vue";
import AdminConfirmation from "../../../components/AdminComponents/AdminConfirmation.vue";
import Instruction from "../../../components/AdminComponents/Instruction.vue";

export default {
  data() {
    return {
      showEditButton: false,
      showTransactionList: false,
      showWalletList: false,
      showPlanList: false,
      hideTransactionFilter: true,

      transactionFilters: [
        "All Transactions",
        "Deposit",
        "Withdrawal",
        "Approved",
        "Pending",
      ],
      transactionFilter: "All Transactions",

      transactionTypes: ["deposit"],
      transactionType: "Choose Transaction Type",

      walletTypes: [],
      walletType: "Select Wallet",

      planTypes: [],
      planType: "Select Plan",

      transactions: [],
      transaction: "",
      narration: "",
      amount: "",
      dateTime: "",
      user: "",
      username: "",
      company: "",

      response: "",
      responseState: false,
      showResponse: false,

      confirmMessage: "",
      confirmState: true,

      editingItem: "",
      deleteId: "",

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
    checkId() {
      if (
        this.$route.params == undefined ||
        this.$route.params.id.length != 24
      ) {
        this.showEditButton = false;
        return false;
      } else {
        this.showEditButton = true;
        return true;
      }
    },

    getTime(data) {
      if (!data) {
        return "Not Available";
      }
      return new Date(data).toLocaleTimeString();
    },

    showConfirmation(msg) {
      if (this.selectedEmailName == "Select Email") {
        this.showResponseMsg("Please select email template", false);
      } else {
        this.confirmMessage = msg;
        this.confirmStatus = false;
      }
    },

    paginate(page) {
      this.currentPage = page;
      this.getTransactions();
    },

    deleteConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmState = false;
    },

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    showResponseMsg(msg, status) {
      this.response = msg;
      this.responseState = status;
      this.showResponse = true;
      setTimeout(() => {
        this.response = "";
        this.showResponse = false;
      }, 6000);
    },

    cleareInputs() {
      this.editingItem = "";
      this.transactionType = "Choose Transaction Type";
      this.amount = "";
      this.planType = "Select Plan";
      this.walletType = "Select Wallet";
      this.dateTime = "";
    },

    selectTransaction(item) {
      this.transactionType = item;
      this.showTransactionList = false;
    },

    selectWallet(item) {
      this.walletType = item.name;
      this.showWalletList = false;
    },

    selectPlan(item) {
      this.planType = item.planName;
      this.showPlanList = false;
    },

    filterTransaction(item) {
      this.transactionFilter = item;
      this.hideTransactionFilter = true;
    },

    selectAccount(item) {
      this.accountType = item.name;
      this.account = item;
      this.showAccountList = false;
    },

    returnConfirmation(data) {
      this.confirmState = true;
      this.confirmMessage = "";
      if (data == "yes") {
        if (this.deleteId != "") {
          this.deleteTransaction(this.deleteId);
        } else {
          this.approveTransaction();
        }
      }
    },

    startAproveTransaction(transaction) {
      this.confirmMessage =
        "Are you sure you want to approve this transaction?";
      this.confirmState = false;
      this.editingItem = transaction;
    },

    processTransaction() {
      const form = {
        username: this.username,
        amount: this.amount,
        account: this.account,
        transactionType: this.transactionType,
        autoTransact: true,
        planName: this.planType,
        walletName: this.walletType,
        autoTransact: true,
        user: this.user,
        time: new Date(this.dateTime).getTime(),
      };

      if (this.editingItem == "") {
        this.createTransaction(form);
      } else {
        this.updateTransaction(form);
      }
    },

    getPlanDurationDays(data) {
      return data / (24 * 60 * 60 * 1000);
    },

    prepareTransactionEdit(transaction) {
      this.showEditButton = true;
      this.editingItem = transaction;
      this.username = transaction.username;
      this.transactionType = transaction.transactionType;
      this.amount = transaction.amount;
      this.dateTime = transaction.date;
      this.walletType = transaction.walletName;
      this.planType = transaction.planName;
    },

    async createTransaction(form) {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}${this.field}`;
      try {
        await this.$axios.post(`/transactions/${query}`, form);
        this.getTransactions();
        this.cleareInputs();
      } catch (err) {
        this.showResponseMsg(err.response.data.message);
      }
    },

    async getUser(id) {
      try {
        const result = await this.$axios.get(`/users/${id}`);
        this.user = result.data.data;
        this.username = this.user.username;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async approveTransaction() {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}${this.field}`;
      this.editingItem.time = new Date().getTime();
      const route =
        this.editingItem.transactionType == "deposit"
          ? `/transactions`
          : `/transactions/approve-withdrawal`;
      try {
        const result = await this.$axios.patch(
          `${route}/${this.editingItem._id}/${query}`,
          this.editingItem
        );
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getTransactions() {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}${this.field}`;
      try {
        const result = await this.$axios.get(`/transactions/${query}`);
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
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

    async getWallets() {
      try {
        const result = await this.$axios.get(`/currency`);
        this.walletTypes = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async updateTransaction(form) {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}${this.field}`;
      try {
        const result = await this.$axios.patch(
          `/transactions/update-transaction/${this.editingItem._id}/${query}`,
          form
        );
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
        this.cleareInputs();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getPlans() {
      try {
        const result = await this.$axios.get(`/plans`);
        this.planTypes = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteTransaction(id) {
      const query = `?limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}${this.field}`;
      try {
        const result = await this.$axios.delete(`transactions/${id}/${query}`);
        this.transactions = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },

  mounted() {
    if (this.checkId()) {
      this.getUser(this.$route.params.id);
    }
    this.getPlans();
    this.getWallets();
    this.getTransactions();
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
