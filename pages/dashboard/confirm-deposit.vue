<template>
  <div class="comfirm-deposit-holder">
    <div class="comfirm-deposit">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="scan-section-holder">
          <div class="balance-header-holder">
            <h1 class="main-heading">Deposit Comfirmation</h1>
          </div>
          <div
            v-if="scanCode && paymentMethod != 'Coinpayment'"
            class="scan-div"
          >
            <div class="scan-toptext-holder">
              <div class="down-logo-texts">You can scan the code below.</div>
            </div>
            <div id="qrcode"></div>
            <div class="scan-toptext-holder down">
              <div class="down-logo-texts">
                Or copy the wallet address below.
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
                      v-model="currency.address"
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
        </div>
        <div class="scan-deposit-table">
          <div class="table">
            <div class="details-top-holder">
              <div class="details-texts-holder">
                <div class="main-header">Deposit Details</div>
              </div>
            </div>
            <div class="main-table">
              <div class="light-table-holder table-green">
                <div class="sn-holder head">
                  <h1 class="table-header head">S/N</h1>
                </div>
                <div class="table-transaction-holder long head">
                  <h1 class="table-header head">Title</h1>
                </div>
                <div class="table-amount-holder long head">
                  <h1 class="table-header head">Description</h1>
                </div>
              </div>
              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">1.</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">Date</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <h1 class="table-header">{{ formatDate(new Date()) }}</h1>
                </div>
              </div>

              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">2.</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">No Profit</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <h1 class="table-header">{{ plan.planPercentage }}%</h1>
                </div>
              </div>

              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">3.</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">Duration</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <h1 class="table-header">
                    Daily for {{ plan.planDuration }} days
                  </h1>
                </div>
              </div>

              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">4.</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">Principal Return</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <h1 class="table-header">Yes (Return 100% Principal)</h1>
                </div>
              </div>

              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">5</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">Wallet</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <img
                    v-if="currency.online"
                    :src="`${currency.image}`"
                    loading="lazy"
                    alt=""
                    class="ehereum"
                  />
                  <img
                    v-else
                    :src="`${FILE_URL}/${currency.image}`"
                    loading="lazy"
                    alt=""
                    class="ehereum"
                  />
                  <h1 class="table-header">{{ currency.name }}</h1>
                </div>
              </div>

              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">6.</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">Deposit</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <h1 class="table-header">
                    ${{ formatMoney(Number(amount).toFixed(2)) }} USD
                  </h1>
                </div>
              </div>

              <div class="light-table-holder">
                <div class="sn-holder">
                  <h1 class="table-header slash">S/N</h1>
                  <h1 class="table-header">7.</h1>
                </div>
                <div class="table-transaction-holder long">
                  <h1 class="table-header slash">Title</h1>
                  <h1 class="table-header">Total Return</h1>
                </div>
                <div class="table-amount-holder long">
                  <h1 class="table-header slash">Description</h1>
                  <h1 class="table-header">
                    ${{
                      formatMoney(
                        (amount * plan.planPercentage * plan.planDuration) /
                          100 +
                          amount * 1
                      )
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
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
        <div v-if="paymentMethod == 'Coinpayment'" class="scan-button-holder">
          <div v-show="onRequest" class="custom-btn processing right">
            <img
              src="https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645afa6c4a84d4675d43a8b9_loader-icon.svg"
              loading="lazy"
              alt=""
              class="processing-icon"
            />
            <div>Processing</div>
          </div>
          <form
            v-show="!onRequest"
            id="coinpayments-form"
            action="https://www.coinpayments.net/index.php"
            method="post"
          >
            <input type="hidden" name="cmd" value="_pay_simple" />
            <input type="hidden" name="reset" value="1" />
            <input
              type="hidden"
              name="merchant"
              value="e4d65107efb4a4e6354264e73d30fb48"
            />
            <input type="hidden" name="item_name" :value="plan.planName" />
            <input type="hidden" name="currency" value="USD" />
            <input type="hidden" name="amountf" :value="amount" />
            <input type="hidden" name="want_shipping" value="0" />
            <input type="hidden" name="custom" :value="userID" />
            <input type="hidden" name="ipn_url" value="neinachukwu123" />
            <input
              type="hidden"
              name="callback_url"
              value="https://renexholdings.com/api/transactions/create-payment"
            />
            <input
              type="image"
              src="https://www.coinpayments.net/images/pub/buynow-grey.png"
              alt="Buy Now with CoinPayments.net"
            />
          </form>
          <nuxt-link to="/dashboard/deposit" class="green-button w-button"
            >Cancel Deposit</nuxt-link
          >
        </div>
        <div v-else class="scan-button-holder">
          <div v-if="onRequest" class="custom-btn processing right">
            <img
              src="https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645afa6c4a84d4675d43a8b9_loader-icon.svg"
              loading="lazy"
              alt=""
              class="processing-icon"
            />
            <div>Processing</div>
          </div>
          <div v-else class="green-button-pad">
            <span @click="makeDeposit" class="green-button w-button"
              >Make Deposit</span
            >
          </div>
          <nuxt-link to="/dashboard/deposit" class="green-button w-button"
            >Cancel Deposit</nuxt-link
          >
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
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      amount: "",
      plan: "",
      wallet: "",
      currency: "",
      scanCode: true,
      qrcodeSize: 200,
      userID: "",
      paymentMethod: "Coinpayment",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
    };
  },

  methods: {
    callResponse(msg, state) {
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
        this.$router.push("/dashboard");
      }, 8000);
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

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    copyInputValue() {
      const inputElement = document.getElementById("walletAddress");
      inputElement.select();
      document.execCommand("copy");
    },

    generateCode() {
      const qrContainer = document.getElementById("qrcode");
      const size = 200;
      const str = this.currency?.address;
      const googleChartsApiUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${str}`;

      // Create the image element for the QR code
      const img = new Image();
      img.src = googleChartsApiUrl;
      img.width = size;
      img.height = size;

      qrContainer.appendChild(img);
    },

    goBack() {
      this.$router.push("/dashboard/deposit");
    },

    async makeDeposit() {
      this.onRequest = true;
      const form = {
        amount: this.amount,
        symbol: this.currency.symbol,
        transactionType: "deposit",
        username: this.user.username,
        referredBy: this.user.referredBy,
        user: this.user,
        planName: this.plan.planName,
        planDuration: this.plan.planDuration,
        planCycle: this.plan.planCycle,
        walletName: this.currency.name,
        percent: this.plan.planPercentage,
        currencyId: this.currency._id,
        walletId: this.wallet._id,
        online: this.currency.online,
        image: this.currency.image,
        time: new Date().getTime(),
        fromBalance: this.$route.query.fromBalance,
      };

      try {
        await this.$axios.post(`/transactions`, form);
        const message =
          this.$route.query.fromBalance == "true"
            ? "Your deposit is successful."
            : "The deposit is pending and will be approved after confirmation";
        this.onRequest = false;
        this.callResponse(message, false);
      } catch (err) {
        this.onRequest = false;
        console.log(err.response.data.message);
      }
    },

    async getCurrency(id) {
      try {
        const result = await this.$axios.get(
          `/currency/${id}/?username=${this.user.username}`
        );
        this.currency = result.data.data;
        this.wallet = result.data.wallet;
        this.generateCode();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getWallet(id) {
      try {
        const result = await this.$axios.get(`/wallet/${id}`);
        this.wallet = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getPlan(id) {
      try {
        const result = await this.$axios.get(`/plans/${id}`);
        this.plan = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  mounted() {
    this.amount = this.$route.query.amount;
    this.userID = uuidv4();
    this.paymentMethod = this.$route.query.paymentMethod;
    this.getCurrency(this.$route.query.currencyId);
    this.getPlan(this.$route.query.planId);
    if (this.$route.query.fromBalance == "true") {
      this.getWallet(this.$route.query.walletId);
      this.scanCode = false;
    }

    const form = document.getElementById("coinpayments-form");
    const submitButton = form.querySelector('input[type="image"]');

    submitButton.addEventListener("click", async (event) => {
      this.onRequest = true;
      event.preventDefault();

      const data = {
        amount: this.amount,
        symbol: this.currency.symbol,
        transactionType: "deposit",
        username: this.user.username,
        referredBy: this.user.referredBy,
        user: this.user,
        planName: this.plan.planName,
        planDuration: this.plan.planDuration,
        planCycle: this.plan.planCycle,
        walletName: this.currency.name,
        percent: this.plan.planPercentage,
        currencyId: this.currency._id,
        walletId: this.wallet._id,
        image: this.currency.image,
        online: this.currency.online,
        time: new Date().getTime(),
        fromBalance: this.$route.query.fromBalance,
        userID: this.userID,
      };

      try {
        await this.$axios.post(`/transactions`, data);
      } catch (err) {
        console.log(err.response.data.message);
      }

      // Optionally, you can delay the form submission to allow the console.log action to execute
      setTimeout(() => {
        form.submit(); // Submit the form programmatically after the console.log action
      }, 1000); // Delay in milliseconds (adjust as needed)
    });
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { DashboardFooter, DashboardNavigation, DashboardHeader },
};
</script>

<style>
.scan-button-holder {
  flex-wrap: wrap;
}

.processing.right {
  margin-right: 5px;
}

img.ehereum {
  min-width: 30px;
  height: 30px;
}
</style>
