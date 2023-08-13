<template>
  <div class="deposit-holde">
    <div class="deposit">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="account-top-header">
          <h1 class="main-heading">Withdrawal funds</h1>
        </div>
        <div class="account">
          <div class="account-subtext-holder">
            <h1 class="sub-heading">ACCOUNT STATISTICS</h1>
          </div>
          <div class="account-card">
            <div class="top-card-one">
              <div class="circle-bg">
                <div class="middle-holder">
                  <div class="middle-side-content">
                    <div class="sub-heading-holder">
                      <h1 class="plan-heading card-header">Total Balance</h1>
                    </div>
                    <div class="sub-text-holder">
                      <div class="plan-heading sm">
                        ${{ formatMoney(Number(user.totalBalance).toFixed(2)) }}
                        USD
                      </div>
                    </div>
                  </div>
                  <div class="thick-header-holder">
                    <img
                      src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432a9798e9cf5a7506b6a92_bank-deposit-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="account-topicon-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="top-card-one">
              <div class="circle-bg">
                <div class="middle-holder">
                  <div class="middle-side-content">
                    <div class="sub-heading-holder">
                      <h1 class="plan-heading card-header">
                        pending withdrawal
                      </h1>
                    </div>
                    <div class="sub-text-holder">
                      <div class="plan-heading sm">
                        ${{ formatMoney(Number(pendingWithdrawal).toFixed(2)) }}
                      </div>
                    </div>
                  </div>
                  <div class="thick-header-holder">
                    <img
                      src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432acb43030fd0243cf3bcb_dollar-money-bag-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="account-topicon-two"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="other-card-holder">
            <div
              v-for="wallet in wallets"
              :key="wallet._id"
              class="each-other-card"
              :class="{ active: wallet.checked }"
              @click="selectWallet(wallet)"
            >
              <div class="img-other">
                <img
                  v-if="wallet.online"
                  :src="`${wallet.image}`"
                  loading="lazy"
                  alt=""
                  class="account-bitcoin"
                />
                <img
                  v-else
                  :src="`${FILE_URL}/${wallet.image}`"
                  loading="lazy"
                  alt=""
                  class="account-bitcoin"
                />
              </div>
              <nuxt-link to="/dashboard/profile" class="w-inline-block"
                ><img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/643bfe657467a16ed74d14fc_edit-pen-icon%20(1)%201.svg"
                  loading="lazy"
                  alt=""
                  class="image-36"
              /></nuxt-link>
              <div class="other-inside-middle pading">
                <div class="other-middle-header">
                  <h1 class="sub-heading">Balance</h1>
                </div>
                <div class="other-middle-text">
                  <div class="pay-header" :class="{ active: wallet.checked }">
                    ${{ formatMoney(Number(wallet.balance).toFixed(2)) }} USD
                  </div>
                </div>
              </div>
              <div class="other-white-line"></div>
              <div class="other-inside-middle">
                <div class="other-middle-header">
                  <h1 class="sub-heading">Pending Withdrawal</h1>
                </div>
                <div class="other-middle-text">
                  <div class="pay-header" :class="{ active: wallet.checked }">
                    ${{
                      formatMoney(Number(wallet.pendingWithdrawal).toFixed(2))
                    }}
                    USD
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="account-buttom-content">
            <div class="account-button-holder">
              <h1 class="main-heading">Select Payment</h1>
            </div>
            <div class="account-buttom-cover">
              <img
                src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/6432920fe2d057d532fa6d87_white-arrow.svg"
                loading="lazy"
                alt=""
                class="select-cover-arrow"
              />
              <h1 class="sub-heading">Select from the balance</h1>
            </div>
            <div class="account-payment-input">
              <div class="payment-input-form">
                <div class="payment-form w-form">
                  <div>
                    <div class="hold-input">
                      <input
                        type="number"
                        class="text-field w-input"
                        maxlength="256"
                        v-model="amount"
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
                      @click="proceedToWithdraw"
                      class="custom-btn w-button"
                      >Withdraw</span
                    >
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
      wallets: [],
      plans: [],
      currencies: [],
      user: "",
      selectedWallet: "",
      amount: 10,
      percent: "",
      showInput: false,
      pendingWithdrawal: "",

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
        return 0;
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

    selectWallet(wallet) {
      if (wallet.balance != 0) {
        this.wallets.forEach((el) => {
          el.checked = false;
        });
        wallet.checked = true;
        this.selectedWallet = wallet;
        this.showInput = true;
      }
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
      if (Number(this.amount) < Number(this.maxArray[0])) {
        this.percent = Number(this.percentArray[0]);
      } else if (Number(this.amount) > Number(this.maxArray[0])) {
        this.percent = this.percentArray[1];
      } else if (Number(this.amount) > Number(this.maxArray[1])) {
        this.percent = this.percentArray[2];
      }
    },

    setPendingWithdrawal(data) {
      if (data.length > 0) {
        let money = 0;
        data.forEach((el) => {
          money += el.pendingWithdrawal;
        });
        return money;
      }
    },

    async proceedToWithdraw() {
      this.onRequest = true;
      if (this.selectedWallet == "") {
        this.callResponse(
          "Please Select Wallet to continue the withdrawal process.",
          true
        );
        return;
      }
      if (this.selectedWallet.balance < this.amount) {
        this.callResponse(
          "Sorry, the selected wallet have insufficient fund for this transaction",
          true
        );
        return;
      }
      if (this.selectedWallet.walletAddress == "") {
        this.callResponse(
          "Sorry, please set wallet address for this wallet.",
          true
        );
        return;
      }
      const form = {
        amount: this.amount,
        symbol: this.selectedWallet.symbol,
        transactionType: "withdrawal",
        username: this.user.username,
        user: this.user,
        planName: `Not Available`,
        planDuration: 0,
        walletName: this.selectedWallet.name,
        walletId: this.selectedWallet._id,
        online: this.selectedWallet.online,
        image: this.selectedWallet.image,
        time: new Date().getTime(),
      };
      try {
        const result = await this.$axios.post(`/transactions`, form);
        this.callResponse(
          "The withdrawal is pending and will be approved after confirmation",
          false
        );
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getWallets() {
      try {
        const result = await this.$axios.get(
          `/wallet/?username=${this.currentUser.username}`
        );
        this.wallets = this.checkItems(result.data.data);
        this.pendingWithdrawal = this.setPendingWithdrawal(result.data.data);
      } catch (err) {
        console.log(err.response);
      }
    },

    async getUser() {
      try {
        const result = await this.$axios.get(`/users/get-user`);
        this.user = result.data.user;
        this.getWallets();
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  mounted() {
    this.getUser();
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: { DashboardNavigation, DashboardHeader, DashboardFooter },
};
</script>

<style>
.each-other-card {
  margin-bottom: 20px;
  cursor: pointer;
}

.each-other-card.active {
  background: rgba(255, 180, 38, 0.86);
}

.pay-header.active {
  color: white;
}

.custom-btn.processing {
  margin-right: auto;
  width: auto;
  max-width: 200px;
}
</style>
