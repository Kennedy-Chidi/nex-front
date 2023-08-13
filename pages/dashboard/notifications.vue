<template>
  <div class="history deposit">
    <div class="transaction-history">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="history-header-holder note">
          <h1 class="main-heading">Notifications</h1>
        </div>
        <div class="history-table">
          <div class="table">
            <div
              v-for="notification in notifications"
              :key="notification._id"
              class="each-notification"
            >
              <h1 class="main-heading note">
                {{ capitalizeWord(notification.title) }}
              </h1>
              <div class="time">
                {{ getTime(notification.time) }}
                {{ formatDate(notification.time) }}
              </div>
              <div class="note-text">
                {{ notification.message }}
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
      notifications: [],

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
      if (!data) {
        return "";
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

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    capitalizeWord(data) {
      if (data == "" || !data) {
        return "";
      }
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
      this.getNotifications();
    },

    async getNotifications() {
      const query = `?username=${this.user.username}&limit=${this.limit}&sort=${this.sort}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.get(
          `/transactions/notifications/${query}`
        );
        this.notifications = result.data.data;
        this.resultLength = result.data.length;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },

  mounted() {
    this.getNotifications();
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  components: { DashboardHeader, DashboardNavigation, DashboardFooter },
};
</script>

<style></style>
