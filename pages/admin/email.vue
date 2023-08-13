<template>
  <div class="main-wrapper email">
    <AdminNavigation />
    <div class="body-wrapper">
      <AdminTopHeader />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <h4 class="page-title">Email Settings</h4>

          <div class="table-wrapper">
            <table class="custom-table">
              <thead>
                <tr>
                  <td>S/N</td>
                  <td>Banner</td>
                  <td>Template</td>
                  <td>Title</td>
                  <td>Content</td>
                  <td>Greeting</td>
                  <td>Warning</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(email, int) in emails" :key="email._id">
                  <td>
                    {{ int + 1 }}
                  </td>
                  <td>
                    <img
                      v-if="email.banner"
                      :src="`${FILE_URL}/${email.banner}`"
                      alt=""
                      class="banner"
                    />
                  </td>
                  <td>{{ email.template }}</td>
                  <td>{{ email.title }}</td>
                  <td>{{ email.content }}</td>
                  <td>{{ email.greeting }}</td>
                  <td>{{ email.warning }}</td>
                  <td>
                    <div class="filter-box" @click="prepareEmailEdit(email)">
                      <img
                        src="/admin-images/edit-gray.svg"
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

          <div v-if="editState" class="input-wrapper w-form">
            <form action="#" class="input-form">
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Title <span class="important">*</span></label
                ><input
                  type="text"
                  class="plan-input w-input"
                  placeholder="Email Title"
                  v-model="title"
                />
              </div>
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Greeting <span class="important">*</span></label
                ><input
                  type="text"
                  class="plan-input w-input"
                  placeholder="Hi {Username}/ Dear {fullName}"
                  v-model="greeting"
                />
              </div>
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Email Colors <span class="important">*</span></label
                >

                <div class="color-holder">
                  <div>
                    <h3>Main Color</h3>
                    <input
                      type="color"
                      class="plan-input w-input"
                      v-model="mainColor"
                    />
                  </div>
                  <div>
                    <h3>Header color</h3>
                    <input
                      type="color"
                      class="plan-input w-input"
                      v-model="headerColor"
                    />
                  </div>
                  <div>
                    <h3>Footer color</h3>
                    <input
                      type="color"
                      class="plan-input w-input"
                      v-model="footerColor"
                    />
                  </div>
                </div>
              </div>
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Warning <span class="important">*</span></label
                ><input
                  type="text"
                  class="plan-input w-input"
                  placeholder="Please ignore if you didn't send this email"
                  v-model="warning"
                />
              </div>
              <div class="each-input content">
                <label for="field-3" class="input-label">Email Content</label
                ><textarea
                  placeholder="Plan Description"
                  maxlength="5000"
                  v-model="content"
                  class="plan-input w-input"
                ></textarea>
              </div>

              <div class="button-holder">
                <label for="email" class="upload-btn button">
                  <img
                    src="/admin-images/white-upload.svg"
                    loading="lazy"
                    alt=""
                    class="upload-icon"
                  />
                  <div>Upload Image</div>
                  <input
                    type="file"
                    id="email"
                    class="file-input"
                    @change="setEmailBanner"
                  />
                </label>
                <input
                  type="button"
                  value="Edit Email"
                  class="button w-button"
                  @click="updateEmail"
                /><input
                  type="button"
                  value="Cancel"
                  class="button w-button"
                  @click="editState = !editState"
                />
              </div>
            </form>
          </div>
        </div>
        <instruction />
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
      emails: [],
      content: "",
      editState: false,
      editId: "",
      content: "",
      name: "",
      title: "",
      headerColor: "",
      footerColor: "",
      mainColor: "",
      greeting: "",
      warning: "",

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

    clearInputs() {
      this.editId = "";
      this.editState = false;
      this.name = "";
      this.content = "";
    },

    setEmailBanner(e) {
      this.banner = e.target.files[0];
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getEmails();
    },

    paginate(page) {
      this.currentPage = page;
      this.getEmails();
    },

    prepareEmailEdit(email) {
      this.editState = true;
      this.editId = email._id;
      this.content = email.content;
      this.title = email.title;
      this.banner = email.banner;
      this.greeting = email.greeting;
      this.warning = email.warning;
      this.headerColor = email.headerColor;
      this.footerColor = email.footerColor;
      this.mainColor = email.mainColor;
    },

    async updateEmail() {
      const form = new FormData();
      form.append("banner", this.banner);
      form.append("title", this.title);
      form.append("content", this.content);
      form.append("headerColor", this.headerColor);
      form.append("footerColor", this.footerColor);
      form.append("mainColor", this.mainColor);
      form.append("greeting", this.greeting);
      form.append("warning", this.warning);

      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.patch(
          `/emails/${this.editId}/${query}`,
          form
        );
        this.emails = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInputs();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createEmails() {
      const form = {
        doc1: { template: "confirm-registration" },
        doc2: { template: "reset-password" },
        doc3: { template: "deposit" },
        doc4: { template: "withdrawal" },
        doc5: { template: "registration-successful" },
        doc6: { template: "maintenance" },
        doc7: { template: "deposit-approval" },
        doc8: { template: "withdrawal-approval" },
        doc9: { template: "seasonal-greetings" },
        doc10: { template: "investment-completion" },
        doc11: { template: "message" },
        doc12: { template: "profiling-notification" },
        doc13: { template: "profiling-approved" },
      };
      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.post(`/emails/${query}`, form);
        this.emails = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response);
      }
    },

    async getEmails() {
      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.get(`/emails/${query}`);
        this.emails = result.data.data;
        if (this.emails.length == 0) {
          this.createEmails();
        } else {
          this.resultLength = result.data.resultLength;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },

  mounted() {
    this.getEmails();
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
    editor() {
      return this.$store.state.editor.editor;
    },
  },

  components: {
    AdminFooter,
    AdminNavigation,
    AdminTopHeader,
    Instruction,
  },
};
</script>

<style>
.color-holder {
  display: flex;
  justify-content: space-between;
}

.color-holder h3 {
  font-size: 12px;
  line-height: 15px;
  margin: 0;
}

input[type="color"] {
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
}
</style>
