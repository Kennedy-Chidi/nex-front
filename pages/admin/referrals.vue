<template>
  <div class="main-wrapper users">
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
          <h4 class="page-title">Referrals Page</h4>
          <div class="table-filters">
            <div class="each-filter-option">
              <div class="filter-page">Email</div>

              <h4 class="filter-label point" @click="hideEmail = !hideEmail">
                {{ selectedEmailName }}
              </h4>

              <ul role="list" class="filter-list" :class="{ hide: hideEmail }">
                <li
                  v-for="email in emails"
                  :key="email._id"
                  class="filter-items"
                  @click="selectEmail(email)"
                >
                  <div>{{ email.name }}</div>
                </li>
              </ul>
            </div>
            <div @click="sortName" class="each-filter-option">
              <h4 class="filter-label">Sort By Name</h4>
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
                  <td>Image</td>
                  <td>Username</td>
                  <td>Referrals</td>
                  <td>Date Registered</td>
                  <td>Total Commission</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, int) in users" :key="user._id">
                  <td class="check-td">
                    {{ int + 1 }}
                    <div class="each-input sm">
                      <div
                        class="check-wrapper check-item"
                        @click="toggleCheck($event, user)"
                      >
                        <div
                          :class="{ active: user.checked }"
                          class="check-indicator"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-if="user.image">
                      <img
                        :src="`${FILE_URL}/${user.image}`"
                        alt=""
                        class="banner"
                      />
                    </div>
                    <div v-else class="user-image">
                      {{ user.username.charAt(0).toUpperCase() }}
                    </div>
                  </td>
                  <td>
                    <nuxt-link :to="`/admin/add-user/${user._id}`">{{
                      user.username
                    }}</nuxt-link>

                    <nuxt-link :to="`/admin/transactions/${user._id}`"
                      ><div class="filter-box">
                        <img
                          src="/admin-images/deposit.svg"
                          loading="lazy"
                          alt=""
                          class="filter-icon check action-icon"
                        /></div
                    ></nuxt-link>
                  </td>
                  <td>
                    <div v-for="(referral, int) in user.referrals" :key="int">
                      {{ referral.username }}
                    </div>
                  </td>
                  <td>
                    <div v-for="(referral, int) in user.referrals" :key="int">
                      {{ formatDate(referral.regDate) }}
                    </div>
                  </td>
                  <td>{{ formatMoney(user.commission) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-label">
            <div>
              <strong class="bold-text">Results</strong>: {{ itemLength }}
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
                class="pagination-item"
                @click="paginate(currentPage - 1)"
              >
                <img
                  src="/admin-images/cheveron-left.svg"
                  loading="lazy"
                  alt=""
                  class="pagination-img"
                />
              </li>
              <li
                v-for="(page, int) in pages()"
                :key="int"
                class="pagination-item"
                @click="paginate(int + 1)"
              >
                <div>{{ int + 1 }}</div>
              </li>

              <li
                class="pagination-item"
                v-if="currentPage < pages(currentPage + 1).length"
                @click="paginate(currentPage + 1)"
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
          <div class="table-actions">
            <div class="each-filter-option min">
              <div class="filter-page">Bulk</div>
              <div @click="bulkSelection" class="filter-box">
                <img
                  src="/admin-images/bulk-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon check"
                />
              </div>
            </div>
            <div class="each-filter-option min">
              <div class="filter-page">Send Email</div>
              <div
                @click="
                  showConfirmation(
                    `Are you sure you want to send  ${selectedEmailName} email to the selected users?`
                  )
                "
                class="filter-box"
              >
                <img
                  src="/admin-images/emails.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon check"
                />
              </div>
            </div>
          </div>
          <div
            class="response"
            v-if="showResponse"
            :class="{ success: responseState }"
          >
            {{ response }}
          </div>
        </div>
        <Instruction />
      </div>
      <AdminFooter />
    </div>
  </div>
</template>

<script>
import AdminConfirmation from "../../components/AdminComponents/AdminConfirmation.vue";
import AdminFooter from "../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../components/AdminComponents/AdminNavigation.vue";
import AdminTopHeader from "../../components/AdminComponents/AdminTopHeader.vue";
import Instruction from "../../components/AdminComponents/Instruction.vue";

export default {
  data() {
    return {
      users: [],
      referrals: [],
      limit: 4,
      selectedEmailName: "Select Email",
      selectedEmail: "",

      limit: 4,
      sort: "-regDate",
      itemLength: "",
      currentPage: 1,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.itemLength / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },

      emails: [],
      hideEmail: true,
      isBulk: false,

      confirmMessage: "",
      confirmStatus: true,

      response: "",
      responseState: false,
      height: 0,
      showResponse: false,

      deleteId: "",
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

    getAge(date) {
      const differenceMs = new Date().getTime() - new Date(date).getTime();
      return Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365));
    },

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    clearSelected() {
      this.selectedEmailName = "Select Email";
      this.isBulk = false;
      this.users.forEach((el) => {
        el.checked = false;
      });
    },

    formatDate(data) {
      const date = new Date(data);
      const options = {
        weekday: "short",
        day: "numeric",
        month: "long",
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      return formatter.format(date);
    },

    toggleCheck(e, item) {
      item.checked = !item.checked;
    },

    paginate(int) {
      this.currentPage = int;
      this.getUsers();
    },

    sortName() {
      this.sort = this.sort == "-username" ? "username" : "-username";
      this.getUsers();
    },

    showConfirmation(msg) {
      if (this.selectedEmailName == "Select Email") {
        this.showResponseMsg("Please select email template", false);
      } else {
        this.confirmMessage = msg;
        this.confirmStatus = false;
      }
    },

    deleteConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      this.confirmStatus = !this.confirmStatus;
      if (data == "yes") {
        if (this.deleteId != "") {
          this.deleteUser();
        } else {
          const emailedUsers = [];
          this.users.forEach((el) => {
            if (el.checked == true) {
              emailedUsers.push(el);
            }
          });

          if (emailedUsers.length == 0) {
            this.showResponseMsg("Please select at least one user", false);
          } else {
            this.sendEmail(emailedUsers);
          }
        }
      }
      this.deleteId = "";
    },

    selectEmail(email) {
      this.selectedEmailName = email.name;
      this.selectedEmail = email;
      this.hideEmail = !this.hideEmail;
    },

    bulkSelection() {
      this.isBulk = !this.isBulk;
      if (this.isBulk) {
        this.users.forEach((el) => {
          el.checked = true;
        });
      } else {
        this.users.forEach((el) => {
          el.checked = false;
        });
      }
    },

    checkItems(items) {
      items.forEach((el) => {
        el.checked = false;
      });

      return items;
    },

    async sendEmail(users) {
      const form = {
        users: users,
        email: this.selectedEmail,
      };
      try {
        await this.$axios.post(`/emails/send-email`, form);
        this.showResponseMsg("The email was sent successfully", true);
        this.clearSelected();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getEmails() {
      try {
        const result = await this.$axios.get(`/emails`);
        this.emails = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getUsers() {
      const query = `?limit=${this.limit}&hasReferred=true&page=${this.currentPage}`;
      try {
        const result = await this.$axios.get(`/users/${query}`);
        this.users = this.checkItems(result.data.data);
        this.itemLength = result.data.length;
      } catch (err) {
        console.log(err.response);
      }
    },

    async deleteUsers() {
      try {
        await this.$axios.delete(`/users/${this.deleteId}`);
        this.users = this.checkItems(result.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getUsers();
    this.getEmails();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: {
    Instruction,
    AdminFooter,
    AdminNavigation,
    AdminTopHeader,
    AdminConfirmation,
  },
};
</script>

<style>
.filter-label.point {
  cursor: pointer;
}

.filter-label.input {
  border: solid #f3f3f3;
  width: 70px;
  outline: none;
}
.check-td {
  position: relative;
}

.check-wrapper.check-item {
  position: absolute;
  right: -30px;
  top: -20px;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e84c89, #9863a3);
  font-size: 20px;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
