<template>
  <div class="main-wrapper blog">
    <admin-navigation />
    <div class="body-wrapper">
      <admin-top-header />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <h4 class="page-title">Users Comments</h4>

          <div class="table-wrapper">
            <table class="custom-table">
              <thead>
                <tr>
                  <td>S/N</td>
                  <td>Image</td>
                  <td>Username</td>
                  <td>Country</td>
                  <td>Rating</td>
                  <td>Content</td>
                  <td>Date</td>
                  <td>Status</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, int) in reviews" :key="item._id">
                  <td>{{ int + 1 }}</td>
                  <td>
                    <img
                      :src="`${FILE_URL}/${item.profilePicture}`"
                      alt=""
                      class="banner"
                    />
                  </td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.country }}</td>
                  <td>
                    {{ item.rating }}
                  </td>
                  <td>{{ item.comment }}</td>
                  <td>{{ formatDate(item.time) }}</td>
                  <td>
                    <div
                      @click="toggleReviewStatus(item._id, item.status)"
                      class="status"
                      :class="{ success: item.status }"
                      v-if="item.status"
                    >
                      Active
                    </div>
                    <div
                      @click="toggleReviewStatus(item._id, item.status)"
                      :class="{ success: item.status }"
                      class="status"
                      v-else
                    >
                      Draft
                    </div>
                  </td>
                  <td>
                    <div class="filter-box" @click="prepareReview(item)">
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
                          'Are you sure you want to delete this Blog',
                          item._id
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
            <div class="input-form">
              <div class="each-input">
                <label for="name-3" class="input-label">Country</label>
                <h4
                  class="select-display"
                  @click="showReviewCountries = !showReviewCountries"
                >
                  <img
                    v-if="selectedFlag"
                    :src="`${selectedFlag}`"
                    loading="lazy"
                    alt=""
                    class="flag"
                  />
                  {{ selectedCountry }}
                </h4>
                <ul role="list" class="filter-list" v-if="showReviewCountries">
                  <li
                    v-for="(item, index) in countries"
                    :key="index"
                    class="filter-items"
                    @click="setCountry(item)"
                  >
                    <img
                      :src="`${item.flagUrl}`"
                      loading="lazy"
                      alt=""
                      class="flag"
                    />
                    <div>{{ item.country }}</div>
                  </li>
                </ul>
                <img
                  src="/admin-images/caret-down-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon middle"
                  @click="showReviewCountries = !showReviewCountries"
                />
              </div>

              <div class="each-input">
                <label for="name-4" class="input-label">Username</label
                ><input
                  type="text"
                  class="plan-input w-input"
                  v-model="username"
                  placeholder="Enter Banner Title"
                />
              </div>

              <div class="each-input">
                <label for="password-3" class="input-label">Rating</label
                ><input
                  type="number"
                  class="plan-input w-input"
                  v-model="rating"
                />
              </div>

              <div class="each-input">
                <label for="password-3" class="input-label">Content</label>
                <textarea
                  v-model="content"
                  class="plan-input w-input"
                ></textarea>
              </div>

              <div class="each-input">
                <label for="password-3" class="input-label">Date</label
                ><input type="date" class="plan-input w-input" v-model="date" />
              </div>

              <div class="button-holder">
                <label for="banner" class="upload-btn banner">
                  <img
                    src="/admin-images/white-upload.svg"
                    loading="lazy"
                    alt=""
                    class="upload-icon"
                  />
                  <input
                    type="file"
                    class="file-input"
                    id="banner"
                    @change="setImage"
                  />
                  <div>Upload Image</div>
                </label>
                <input
                  type="button"
                  value="Add Comment"
                  @click="processReview"
                  class="button w-button"
                /><input
                  type="button"
                  value="Cancel"
                  class="button w-button"
                  @click="clearInputs"
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
import AdminFooter from "../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../components/AdminComponents/AdminNavigation.vue";
import AdminTopHeader from "../../components/AdminComponents/AdminTopHeader.vue";
import Instruction from "../../components/AdminComponents/Instruction.vue";

export default {
  data() {
    return {
      reviews: [],
      username: "",
      country: "",
      selectedCountry: "Select Country",
      selectedFlag: "",
      image: "",
      rating: "",
      date: "",

      content: [],
      showReviewCountries: false,
      country: "Select Country",

      editingState: false,
      editingId: "",

      confirmMessage: "",
      confirmStatus: true,
      deleteId: "",

      sort: "-time",
      limit: 3,
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
      if (data == null || data == undefined) {
        return "N/A";
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

    setCountry(country) {
      this.country = country;
      this.selectedCountry = country.country;
      this.selectedFlag = country.flagUrl;
      this.showReviewCountries = false;
    },

    setImage(event) {
      this.image = event.target.files[0];
    },

    clearInputs() {
      this.editingId = "";
      this.editingState = false;
      this.country = "Select Country";
      this.rating = "";
      this.content = "";
      this.image = "";
      this.date = "";
      this.username = "";
    },

    toggleReviewStatus(id, status) {
      this.editingId = id;
      const data = {
        status: !status,
      };
      this.updateReview(data);
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deleteReview(this.deleteId);
      }
      this.confirmStatus = true;
    },

    prepareReview(review) {
      this.editingId = review._id;
      this.editingState = true;
      this.image = review.image;
      this.username = review.username;
      this.rating = review.rating;
      this.content = review.content;
      this.country = review.country;
      this.date = review.time;
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getReview();
    },

    paginate(page) {
      this.currentPage = page;
      this.getReview();
    },

    processReview() {
      const form = new FormData();
      form.append("rating", this.rating);
      form.append("comment", this.content);
      form.append("profilePicture", this.image);
      form.append("country", this.selectedCountry);
      form.append("flag", this.selectedFlag);
      form.append("commented", true);
      form.append("username", this.username);
      form.append("time", new Date().getTime());

      if (this.editingState) {
        this.updateReview(form);
      } else {
        this.createReview(form);
      }
    },

    async updateReview(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&&commented=true`;
      try {
        const result = await this.$axios.patch(
          `/review/${this.editingId}/${query}`,
          form
        );
        this.clearInputs();
        this.reviews = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createReview(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&&commented=true`;
      try {
        const result = await this.$axios.post(`/review/${query}`, form);
        this.clearInputs();
        this.reviews = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getReview() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&&commented=true`;
      try {
        const result = await this.$axios.get(`/review/${query}`);
        this.reviews = result.data.data;
        this.resultLength = result.data.resultLength;
        console.log(this.reviews);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteReview(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&&commented=true`;
      try {
        const result = await this.$axios.delete(`/review/${id}/${query}`);
        this.reviews = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getReview();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    countries() {
      return this.$store.state.registrationDetails.countries;
    },
  },
  components: { Instruction, AdminNavigation, AdminTopHeader, AdminFooter },
};
</script>

<style>
li.filter-items {
  display: flex;
}

li .flag {
  width: 60px;
  margin-right: 5px;
}
</style>
