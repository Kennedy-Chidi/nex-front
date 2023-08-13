<template>
  <div>
    <admin-confirmation
      :msg="confirmMsg"
      :state="confirmStatus"
      @confirm="returnConfirmation"
    />
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
            <td>Category</td>
            <td>Question</td>
            <td>Answer</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(faq, int) in faqs" :key="faq._id">
            <td>{{ int + 1 }}</td>

            <td>{{ faq.category }}</td>
            <td>{{ faq.question }}</td>
            <td><div v-html="faq.answer"></div></td>
            <td>
              <div
                @click="toggleFAQStatus(faq._id, faq.status)"
                class="status"
                :class="{ success: faq.status }"
                v-if="faq.status"
              >
                Active
              </div>
              <div
                @click="toggleFAQStatus(faq._id, faq.status)"
                :class="{ success: faq.status }"
                class="status"
                v-else
              >
                Draft
              </div>
            </td>
            <td>
              <div class="filter-box" @click="prepareFAQEdit(faq)">
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
                    'Are you sure you want to delete this Question',
                    faq._id
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
      <ul v-if="pages().length > 1" role="list" class="min-table-pagination">
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
        <div class="each-input half">
          <label for="name-4" class="input-label"
            >FAQ Category<span class="important">*</span></label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="category"
            placeholder="Enter Category"
          />
        </div>

        <div class="each-input half">
          <label for="name-4" class="input-label"
            >FAQ Question<span class="important">*</span></label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="question"
            placeholder="Enter Question"
          />
        </div>

        <div class="each-input full">
          <label for="password-3" class="input-label"
            >FAQ Answer<span class="important">*</span></label
          >
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="answer"
              :config="editorConfig"
            />
          </client-only>
        </div>
        <div class="button-holder">
          <input
            type="button"
            value="Add FAQ"
            @click="processFAQ"
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
</template>

<script>
import AdminConfirmation from "./AdminConfirmation.vue";
export default {
  components: { AdminConfirmation },
  data() {
    return {
      category: "",
      question: "",
      answer: "",

      faqs: [],

      confirmMsg: "",
      confirmStatus: true,

      editingId: "",
      editingState: false,

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
    clearInput() {
      this.answer = "";
      this.question = "";
      this.category = "";
      this.editingState = false;
      this.editingId = "";
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMsg = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deleteFAQ();
      }
      this.confirmStatus = true;
    },

    toggleFAQStatus(id, status) {
      this.editingId = id;
      this.editingState = true;
      const form = {
        status: !status,
      };

      this.updateFAQ(form);
    },

    prepareFAQEdit(faq) {
      this.answer = faq.answer;
      this.question = faq.question;
      this.category = faq.category;
      this.editingId = faq._id;
      this.editingState = true;
    },

    processFAQ() {
      const form = {
        category: this.category,
        question: this.question,
        answer: this.answer,
        time: new Date().getTime(),
      };

      if (this.editingState) {
        this.updateFAQ(form);
      } else {
        this.createFAQ(form);
      }
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getFAQ();
    },

    paginate(page) {
      this.currentPage = page;
      this.getFAQ();
    },

    async updateFAQ(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/faq/${this.editingId}/${query}`,
          form
        );
        this.faqs = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInput();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createFAQ(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.post(`/faq/${query}`, form);
        this.faqs = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInput();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getFAQ() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/faq/${query}`);
        this.faqs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteFAQ() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(
          `/faq/${this.deleteId}/${query}`
        );
        this.faqs = result.data.data;
        this.resultLength = result.data.resultLength;
        this.deleteId = "";
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },
  },
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  mounted() {
    this.getFAQ();
  },
};
</script>

<style>
.each-input.full textarea {
  min-height: 20vh;
}
</style>
