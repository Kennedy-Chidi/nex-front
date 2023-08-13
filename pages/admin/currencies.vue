<template>
  <div class="main-wrapper crypto">
    <admin-confirmation
      :msg="confirmMessage"
      :state="confirmStatus"
      @confirm="returnConfirmation"
    />
    <AdminNavigation />
    <div class="body-wrapper">
      <AdminTopHeader />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <h4 class="page-title">WALLET ADDRESS</h4>
          <div class="table-filters">
            <div @click="sortResult" class="each-filter-option point">
              <h4 class="filter-label">Time</h4>
              <img
                src="/admin-images/sort.svg"
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
                  <td>Image</td>
                  <td>Name</td>
                  <td>Symbol</td>
                  <td>Address</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(currency, int) in currencies" :key="currency._id">
                  <td>{{ int + 1 }}</td>
                  <td>
                    <img
                      v-if="currency.online"
                      :src="`${currency.image}`"
                      alt=""
                      class="banner currency-icon"
                    />
                    <img
                      v-else
                      :src="`${FILE_URL}/${currency.image}`"
                      alt=""
                      class="banner currency-icon"
                    />
                  </td>
                  <td>{{ currency.name }}</td>
                  <td>
                    {{ currency.symbol }}
                  </td>
                  <td>{{ currency.address }}</td>
                  <td>{{ currency.paymentMethod }}</td>

                  <td>
                    <div
                      @click="
                        toggleCurrencyStatus(currency._id, currency.status)
                      "
                      class="status"
                      :class="{ success: currency.status }"
                      v-if="currency.status"
                    >
                      Active
                    </div>
                    <div
                      @click="
                        toggleCurrencyStatus(currency._id, currency.status)
                      "
                      :class="{ success: currency.status }"
                      class="status"
                      v-else
                    >
                      Draft
                    </div>
                  </td>
                  <td>
                    <div
                      class="filter-box"
                      @click="prepareCurrencyEdit(currency)"
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
                        showConfirmation(
                          'Are you sure you want to delete this currency',
                          currency._id
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

          <div class="input-wrapper w-form">
            <form action="#" class="input-form">
              <div class="each-input">
                <label for="name-3" class="input-label">Select Currency </label>
                <h4
                  class="select-display"
                  @click="showCurrencyList = !showCurrencyList"
                >
                  <img
                    v-if="selectedAutoCurrency"
                    :src="`${selectedAutoCurrency.image}`"
                    loading="lazy"
                    alt=""
                    class="currency-icon"
                  />
                  {{ autoCurrency }}
                </h4>
                <ul
                  role="list"
                  class="filter-list down currency"
                  v-if="showCurrencyList"
                >
                  <li
                    v-for="(currency, index) in autoCurrencies"
                    :key="index"
                    class="filter-items"
                    @click="setAutoCurrency(currency)"
                  >
                    <div>
                      <img
                        :src="`${currency.image}`"
                        loading="lazy"
                        alt=""
                        class="currency-icon"
                        @click="showPaymentMethodList = !showPaymentMethodList"
                      />{{ currency.name }}
                    </div>
                  </li>
                </ul>
                <img
                  src="/admin-images/caret-down-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon middle"
                  @click="showPaymentMethodList = !showPaymentMethodList"
                />
              </div>

              <div class="each-input">
                <label for="name-4" class="input-label">Currency Image </label>
                <label for="currency" class="upload-btn">
                  <img
                    src="/admin-images/white-upload.svg"
                    loading="lazy"
                    alt=""
                    class="upload-icon"
                  />
                  <div>Upload Symbol</div>
                  <input
                    type="file"
                    id="currency"
                    class="file-input"
                    @change="setSymbol"
                  />
                </label>
              </div>
              <div class="each-input">
                <label for="name-4" class="input-label">Currency Name</label
                ><input type="text" class="plan-input w-input" v-model="name" />
              </div>
              <div class="each-input">
                <label for="email-3" class="input-label">Currency Address</label
                ><input
                  type="text"
                  class="plan-input w-input"
                  v-model="address"
                />
              </div>
              <div class="each-input">
                <label for="email-3" class="input-label">Currency Symbol</label
                ><input
                  type="text"
                  class="plan-input w-input"
                  v-model="symbol"
                />
              </div>
              <div class="button-holder">
                <input
                  type="button"
                  value="Add Account"
                  @click="processCurrencyData"
                  class="button w-button"
                /><input
                  type="button"
                  value="Cancel"
                  @click="cancelCurrency"
                  data-wait="Please wait..."
                  class="button w-button"
                />
              </div>
            </form>
          </div>
        </div>
        <Instruction />
      </div>
      <AdminFooter />
    </div>
  </div>
</template>

<script>
import AdminFooter from "../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../components/AdminComponents/AdminNavigation.vue";
import AdminTopHeader from "../../components/AdminComponents/AdminTopHeader.vue";
import Instruction from "../../components/AdminComponents/Instruction.vue";
export default {
  data() {
    return {
      currencies: [],
      autoCurrencies: [],
      symbol: "",
      name: "",
      image: "",
      description: "",
      address: "",
      autoCurrency: "Select Currency",
      selectedAutoCurrency: "",
      paymentMethod: "",

      editingState: false,
      editingId: "",
      showCurrencyList: false,
      online: false,

      confirmMessage: "",
      confirmStatus: "",
      deleteId: "",

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
    showResponseMsg(msg, status) {
      this.response = msg;
      this.responseState = status;
      this.showResponse = true;
      setTimeout(() => {
        this.response = "";
        this.showResponse = false;
      }, 6000);
    },

    setSymbol(e) {
      this.image = e.target.files[0];
    },

    clearInputs() {
      this.symbol = "";
      this.name = "";
      this.description = "";
      this.address = "";
      this.editingId = "";
      this.editingState = false;
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      this.confirmStatus = !this.confirmStatus;
      if (data == "yes") {
        this.deleteCurrency(this.deleteId);
      }
    },

    prepareCurrencyEdit(currency) {
      this.editingId = currency._id;
      this.editingState = true;
      this.symbol = currency.symbol;
      this.image = currency.image;
      this.name = currency.name;
      this.address = currency.address;
      this.online = currency.online;
      this.paymentMethod = currency.paymentMethod;
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getCurrencies();
    },

    cancelCurrency() {
      this.selectedAutoCurrency = "";
      this.autoCurrency = "Select Currency";
      this.symbol = "";
      this.name = "";
      this.image = "";
      this.paymentMethod = "Manual";
    },

    setAutoCurrency(currency) {
      this.autoCurrency = currency.name;
      this.selectedAutoCurrency = currency;
      this.showCurrencyList = false;
      this.image = this.selectedAutoCurrency.image;
      this.name = this.selectedAutoCurrency.name;
      this.symbol = this.selectedAutoCurrency.symbol;
      this.paymentMethod = "Coinpayment";
    },

    paginate(page) {
      this.currentPage = page;
      this.getCurrencies();
    },

    processCurrencyData() {
      let form;
      if (this.selectedAutoCurrency != "") {
        form = {
          image: this.image,
          name: this.name,
          address: this.address,
          symbol: this.symbol.toUpperCase(),
          paymentMethod: this.paymentMethod,
          time: new Date().getTime(),
          online: true,
        };
      } else {
        form = new FormData();
        form.append("symbol", this.symbol);
        form.append("image", this.image);
        form.append("name", this.name);
        form.append("address", this.address);
        form.append("online", this.online);
        form.append("paymentMethod", this.paymentMethod);
        form.append("time", new Date().getTime());
      }

      if (this.editingState) {
        this.updateCurrency(form);
      } else {
        this.createCurrency(form);
      }
    },

    toggleCurrencyStatus(id, status) {
      this.editingId = id;
      const data = new FormData();
      data.append("status", !status);

      this.updateCurrency(data);
    },

    async getCryptos() {
      try {
        const response = await this.$axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd", // Change 'usd' to your preferred currency
              order: "market_cap_desc",
              per_page: 50,
              page: 1,
            },
          }
        );
        this.autoCurrencies = response.data;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async updateCurrency(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/currency/${this.editingId}/${query}`,
          form
        );
        this.currencies = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInputs();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createCurrency(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.post(`/currency/${query}`, form);
        this.showResponseMsg("The currency was created successfully", true);
        this.currencies = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInputs();
      } catch (err) {
        this.showResponseMsg(err.response.data.message, false);
      }
    },

    async getCurrencies() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/currency/${query}`);
        this.currencies = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async deleteCurrency(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(`/currency/${id}/${query}`);
        this.currencies = result.data.data;
        this.resultLength = result.data.resultLength;
        this.deleteId = "";
      } catch (err) {
        this.showResponseMsg(err.response.data.message, false);
      }
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  mounted() {
    this.getCurrencies();
    this.getCryptos();
  },
  components: { AdminFooter, AdminNavigation, AdminTopHeader, Instruction },
};
</script>

<style>
.banner.currency {
  max-height: 35px;
}

.banner.currency-icon {
  width: 30px;
}

.currency-icon {
  width: 25px;
  margin-right: 10px;
}

ul.currency {
  z-index: 9999;
}
</style>
