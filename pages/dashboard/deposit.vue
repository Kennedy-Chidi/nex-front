<template>
  <div class="deposit-holde">
    <div class="deposit">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="doposit-balance-holder">
          <div class="balance-top-header">
            <div class="balance-header-holder">
              <h1 class="main-heading">Make Deposit</h1>
            </div>
            <div class="balance-text-holder">
              <h1 class="sub-heading">Available Balance</h1>
            </div>
          </div>
          <div class="short-card-holder currency">
            <div
              v-for="wallet in wallets"
              :key="wallet._id"
              class="each-short-card"
            >
              <div class="short-top">
                <div class="short-side-contents">
                  <div class="main-header-holder">
                    <h1 class="main-header">{{ wallet.name }}</h1>
                  </div>
                  <div class="short-middle-flexer">
                    <div class="main-text-holder">
                      <a href="#" class="main-text">Edit Account</a>
                    </div>
                    <a href="#" class="edit-img-link w-inline-block"
                      ><img
                        src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a18f57e24b363fc634e5_link-icon%201.svg"
                        loading="lazy"
                        alt=""
                        class="image-18"
                    /></a>
                  </div>
                </div>
                <img
                  v-if="wallet.online"
                  :src="`${wallet.image}`"
                  loading="lazy"
                  alt=""
                  class="edit-1"
                />
                <img
                  v-else
                  :src="`${FILE_URL}/${wallet.image}`"
                  loading="lazy"
                  alt=""
                  class="edit-1"
                />
              </div>
              <div class="short-down">
                <h1 class="sub-heading">
                  ${{ formatMoney(Number(wallet.balance).toFixed(2)) }} USD
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div class="select-plan-holder">
          <div class="plan-header-holder dash">
            <h1 class="main-heading dash select">Select Plan</h1>
          </div>

          <div class="plan-card-holder dash">
            <div
              v-for="plan in plans"
              :key="plan._id"
              class="each-plan-card dash"
              :class="{ active: plan.checked }"
              @click="selectPlan(plan)"
            >
              <div class="plan-heading-holder">
                <h1 class="plan-heading card-header">{{ plan.planName }}</h1>
              </div>
              <div class="plan-heading-holder">
                <h1 class="plan-heading">{{ plan.planPercentage }}%</h1>
              </div>
              <div class="plan-heading-holder">
                <h1 class="plan-heading">Income : {{ plan.planPeriod }}</h1>
              </div>
              <div class="plan-heading-holder">
                <h1 class="plan-heading">Deposit : Range</h1>
              </div>
              <div class="plan-heading-holder">
                <h1 class="plan-heading">
                  Minimum :
                  {{ formatMoney(Number(plan.planMinimum).toFixed(2)) }}$
                </h1>
              </div>
              <div class="plan-heading-holder">
                <h1 class="plan-heading" v-if="plan.planMaximum > 0">
                  Maximum : {{ formatMoney(Number(plan.planMaximum)) }}$
                </h1>
                <h1 class="plan-heading" v-else>Maximum : UNLIMITED</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="select-payment">
          <div class="payment-top-holder">
            <h1 class="main-heading">Select Payment</h1>
          </div>
          <div class="payment-type-holder">
            <div class="each-payment-type">
              <div class="top-payment-holder">
                <h1 class="plan-heading">Select From Balance</h1>
              </div>
              <div class="payment-method-holder">
                <div
                  v-for="wallet in wallets"
                  :key="wallet._id"
                  class="each-payment-method"
                  @click="selectWallet(wallet)"
                  :class="{
                    active: wallet.checked,
                    disable: wallet.balance == 0,
                  }"
                >
                  <img
                    v-if="wallet.online"
                    :src="`${wallet.image}`"
                    loading="lazy"
                    alt=""
                    class="deposit-payment-bitcoin"
                  />
                  <img
                    v-else
                    :src="`${FILE_URL}/${wallet.image}`"
                    loading="lazy"
                    alt=""
                    class="deposit-payment-bitcoin"
                  />
                  <div class="paytype-header-holder">
                    <h1 class="pay-header">{{ wallet.name }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="each-payment-type">
              <div class="top-payment-holder">
                <h1 class="plan-heading">Select From System</h1>
              </div>
              <div class="payment-method-holder">
                <div
                  v-for="currency in currencies"
                  :key="currency._id"
                  class="each-payment-method"
                  @click="selectSystem(currency)"
                  :class="{ active: currency.checked }"
                >
                  <img
                    v-if="currency.online"
                    :src="`${currency.image}`"
                    loading="lazy"
                    alt=""
                    class="deposit-payment-red"
                  />
                  <img
                    v-else
                    :src="`${FILE_URL}/${currency.image}`"
                    loading="lazy"
                    alt=""
                    class="deposit-payment-red"
                  />
                  <div class="paytype-header-holder">
                    <h1 class="pay-header">{{ currency.name }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="payment-amount">
          <div class="amount-top-holder">
            <h1 class="main-heading">Amount</h1>
          </div>
          <div class="amount-middle-holder">
            <div class="payment-input-holder">
              <div class="payment-input-form amount">
                <div class="payment-form w-form">
                  <div>
                    <div class="hold-input">
                      <input
                        type="number"
                        class="text-field w-input"
                        maxlength="256"
                        placeholder=""
                        v-model="amount"
                        @keyup="setPercentage"
                      />
                    </div>
                    <div class="erro-holder">
                      <div
                        class="erro-text"
                        v-if="showResponse"
                        :class="{ error: isError }"
                      >
                        {{ response }}
                      </div>
                    </div>
                    <div v-if="onRequest" class="custom-btn processing">
                      <img
                        src="https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645afa6c4a84d4675d43a8b9_loader-icon.svg"
                        loading="lazy"
                        alt=""
                        class="processing-icon"
                      />
                      <div>Processing</div>
                    </div>
                    <span
                      v-else
                      @click="proceedToDeposit"
                      class="custom-btn w-button"
                      >Deposit</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="payment-calender-holder">
              <div class="each-daily-holder">
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/64336f09d57930655b40c007_24-hour-icon%202.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-calender"
                />
                <div class="day-header-holder">
                  <h1 class="plan-heading">
                    $ {{ formatMoney(((amount * percent) / 100).toFixed(2)) }}
                  </h1>
                </div>
                <div class="day-texts-holder">
                  <h1 class="pay-header">Profit Daily</h1>
                </div>
              </div>
              <div class="each-daily-holder">
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/64336ee53f44a774257132a9_week-icon%202.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-calender"
                />
                <div class="day-header-holder">
                  <h1 class="plan-heading">
                    $
                    {{ formatMoney(((amount * percent * 7) / 100).toFixed(2)) }}
                  </h1>
                </div>
                <div class="day-texts-holder">
                  <h1 class="pay-header">Profit Weekly</h1>
                </div>
              </div>
              <div class="each-daily-holder">
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/64336efc72548f96b3014bfa_daily-schedule-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="deposit-calender"
                />
                <div class="day-header-holder">
                  <h1 class="plan-heading">
                    $
                    {{
                      formatMoney(((amount * percent * 30) / 100).toFixed(2))
                    }}
                  </h1>
                </div>
                <div class="day-texts-holder">
                  <h1 class="pay-header">Profit Monthly</h1>
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
      wallets: [],
      plans: [],
      currencies: [],

      selectedPlan: "",
      selecetedWalletBalance: "",
      selectedWalletId: "",
      selectedCurrencyId: "",
      fromBalance: false,
      amount: 1000,
      percent: "",
      paymentMethod: "",

      maxArray: [],
      percentArray: [],

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
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

    callResponse(msg, state) {
      this.onRequest = false;
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    watchInput() {
      if (this.selectedPlan == "") {
        this.callResponse("Choose a Plan for deposit to proceed", true);
        return;
      } else if (
        this.fromBalance == true &&
        this.selecetedWalletBalance < this.amount
      ) {
        this.callResponse(
          "Sorry, you have insufficient balance in this wallet",
          true
        );
        return;
      } else {
        if (this.amount > this.selectedPlan.planMaximum) {
          this.amount = this.selectedPlan.planMaximum;
        }
      }
    },

    selectWallet(wallet) {
      if (wallet.balance != 0) {
        this.wallets.forEach((el) => {
          el.checked = false;
        });
        wallet.checked = true;
        this.selecetedWalletBalance = wallet.balance;
        this.checkItems(this.currencies);
        this.fromBalance = true;
        this.selectedWalletId = wallet._id;
        this.currencies.forEach((el) => {
          if (el.name == wallet.name) {
            this.selectedCurrencyId = el._id;
          }
        });
        this.paymentMethod = wallet.paymentMethod;
      }
    },

    selectSystem(currency) {
      this.currencies.forEach((el) => {
        el.checked = false;
      });
      this.checkItems(this.wallets);
      this.selectedCurrencyId = currency._id;
      this.fromBalance = false;
      currency.checked = true;
      this.paymentMethod = currency.paymentMethod;
    },

    selectPlan(plan) {
      this.plans.forEach((el) => {
        el.checked = false;
      });
      this.selectedPlan = plan;
      plan.checked = true;
      this.amount = plan.planMinimum;
      this.percent = plan.planPercentage;
    },

    checkItems(items) {
      items.forEach((el) => {
        el.checked = false;
      });

      return items;
    },

    setMaxArray(plans) {
      plans.forEach((el) => {
        this.maxArray.push(el.planMaximum);
        this.percentArray.push(el.planPercentage);
      });
    },

    setPercentage() {
      this.watchInput();
      if (Number(this.amount) < Number(this.maxArray[0])) {
        this.percent = Number(this.percentArray[0]);
      } else if (Number(this.amount) > Number(this.maxArray[0])) {
        this.percent = this.percentArray[1];
      } else if (Number(this.amount) > Number(this.maxArray[1])) {
        this.percent = this.percentArray[2];
      }
    },

    proceedToDeposit() {
      this.onRequest = true;
      if (this.selectedPlan == "") {
        this.callResponse("Please select a plan", true);
        return;
      }
      if (this.selectedWalletId == "" && this.selectedCurrencyId == "") {
        this.callResponse("Please select a currency to deposit in", true);
        return;
      }
      if (
        this.fromBalance == true &&
        this.selecetedWalletBalance < this.amount
      ) {
        this.callResponse(
          "Sorry, you have insufficient balance in this wallet",
          true
        );
        return;
      }
      this.$router.push(
        `/dashboard/confirm-deposit/?paymentMethod=${this.paymentMethod}&planId=${this.selectedPlan._id}&amount=${this.amount}&walletId=${this.selectedWalletId}&currencyId=${this.selectedCurrencyId}&fromBalance=${this.fromBalance}`
      );
    },

    async getWallets() {
      try {
        const result = await this.$axios.get(
          `/wallet/?username=${this.user.username}`
        );
        this.wallets = this.checkItems(result.data.data);
      } catch (err) {
        console.log(err.response);
      }
    },

    async getCurrencies() {
      try {
        const result = await this.$axios.get(`/currency`);
        this.currencies = this.checkItems(result.data.data);
      } catch (err) {
        console.log(err.response);
      }
    },

    async getPlans() {
      try {
        const result = await this.$axios.get(`/plans`);
        this.plans = this.checkItems(result.data.data);
        this.setMaxArray(this.plans);
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  mounted() {
    this.getWallets();
    this.getPlans();
    this.getCurrencies();
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

.custom-btn {
  color: #232323;
  background-color: #ffb426;
  border-radius: 5px;
  margin-right: 20px;
}
</style>
