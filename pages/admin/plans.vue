<template>
  <div class="main-wrapper plans">
    <AdminNavigation />
    <div class="body-wrapper">
      <AdminTopHeader />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <h4 class="page-title">INVESTMENT PLAN</h4>
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
                  <td>Banner</td>
                  <td>Name</td>
                  <td>Period</td>
                  <td>Duration</td>
                  <td>Percentage</td>
                  <td>Minimum</td>
                  <td>Maximum</td>
                  <td>Commission</td>
                  <td>Description</td>
                  <td>Tags</td>
                  <td>Status</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(plan, int) in plans" :key="plan._id">
                  <td>{{ int + 1 }}</td>
                  <td>
                    <img
                      :src="`${FILE_URL}/${plan.planBanner}`"
                      alt=""
                      class="banner"
                    />
                  </td>
                  <td>{{ plan.planName }}</td>
                  <td>{{ plan.planPeriod }}</td>
                  <td>{{ plan.planDuration }} Days</td>
                  <td>{{ plan.planPercentage }}%</td>
                  <td>${{ formatMoney(plan.planMinimum) }}</td>
                  <td>${{ formatMoney(plan.planMaximum) }}</td>
                  <td>{{ plan.referralCommission }}%</td>
                  <td>
                    {{ plan.planDescription }}
                  </td>
                  <td>
                    <div v-for="(tag, int) in plan.planTags" :key="int">
                      {{ tag }}
                    </div>
                  </td>
                  <td>
                    <div
                      @click="togglePlanStatus(plan._id, plan.planStatus)"
                      class="status"
                      :class="{ success: plan.planStatus }"
                      v-if="plan.planStatus"
                    >
                      Active
                    </div>
                    <div
                      @click="togglePlanStatus(plan._id, plan.planStatus)"
                      :class="{ success: plan.planStatus }"
                      class="status"
                      v-else
                    >
                      Draft
                    </div>
                  </td>
                  <td>
                    <div class="filter-box" @click="preparePlanEdit(plan)">
                      <img
                        src="/admin-images/edit-gray.svg"
                        loading="lazy"
                        alt=""
                        class="filter-icon check action-icon"
                      />
                    </div>
                    <div class="filter-box" @click="deletePlan(plan._id)">
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
              <strong class="bold-text">Results</strong>: {{ planLength }}
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
            <div
              class="response"
              v-if="showResponse"
              :class="{ success: responseState }"
            >
              {{ response }}
            </div>
            <div class="input-form" action="#" @submit.prevent="">
              <div class="each-input">
                <label for="name" class="input-label"
                  >Plan Name <span class="important">*</span></label
                ><input
                  type="text"
                  class="plan-input w-input"
                  maxlength="256"
                  name="Plan Name"
                  v-model="planName"
                />
              </div>
              <div class="each-input">
                <label for="name-3" class="input-label"
                  >Plan Period <span class="important">*</span></label
                >
                <h4
                  class="select-display"
                  @click="showPlanPeriodList = !showPlanPeriodList"
                >
                  {{ planPeriod }}
                </h4>
                <ul
                  role="list"
                  class="filter-list down"
                  v-if="showPlanPeriodList"
                >
                  <li
                    v-for="(plan, index) in planPeriodList"
                    :key="index"
                    class="filter-items"
                    @click="setPlanPeriod(plan)"
                  >
                    <div>{{ plan }}</div>
                  </li>
                </ul>
                <img
                  src="/admin-images/caret-down-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon middle"
                  @click="showPlanPeriodList = !showPlanPeriodList"
                />
              </div>
              <div class="each-input">
                <label for="duration" class="input-label"
                  >Plan Duration (In days)
                  <span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  maxlength="256"
                  name="duration"
                  v-model="planDuration"
                />
              </div>
              <div class="each-input">
                <label for="duration-2" class="input-label"
                  >Percentage Profit <span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  maxlength="256"
                  name="Profit"
                  v-model="planPercentage"
                />
              </div>
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Minimum Deposit <span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  maxlength="256"
                  name="Minimum"
                  v-model="planMinimum"
                />
              </div>
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Maximum Deposit <span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  maxlength="256"
                  name="duration-2"
                  v-model="planMaximum"
                />
              </div>
              <div class="each-input">
                <label for="duration-3" class="input-label"
                  >Referral Commission (in %)</label
                ><input
                  type="number"
                  class="plan-input w-input"
                  maxlength="256"
                  name="duration-2"
                  v-model="referralCommission"
                />
              </div>
              <div class="each-input">
                <label for="field" class="input-label">Plan Description</label
                ><textarea
                  placeholder="Plan Description"
                  maxlength="5000"
                  name="description"
                  v-model="planDescription"
                  class="plan-input w-input"
                ></textarea>
              </div>
              <div class="each-input">
                <ul v-if="planTags.length > 0" role="list" class="tags">
                  <li
                    v-for="(tag, int) in planTags"
                    :key="int"
                    class="each-tag"
                  >
                    <div>{{ tag }}</div>
                    <img
                      src="/admin-images/delete-gray.svg"
                      alt=""
                      class="list-delete"
                      @click="removeListItem(int)"
                    />
                  </li>
                </ul>
                <label for="name-3" class="input-label">Plan Tags</label
                ><input
                  type="text"
                  class="plan-input w-input"
                  maxlength="256"
                  @keypress.enter.prevent="populateTags"
                  placeholder="Write and press Enter Key"
                  v-model="planTag"
                />
              </div>
              <div class="each-input">
                <label for="name-2" class="input-label">Plan Banner</label>
                <label class="upload-btn" for="planBanner">
                  <img
                    src="/admin-images/white-upload.svg"
                    loading="lazy"
                    alt=""
                    class="upload-icon"
                  />
                  <div>Upload Banner</div>
                  <input
                    type="file"
                    id="planBanner"
                    class="file-input"
                    @change="setPlanBanner"
                  />
                </label>
              </div>
              <div class="button-holder">
                <input
                  type="button"
                  value="Submit"
                  data-wait="Please wait..."
                  class="button w-button"
                  @click="processPlanData"
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
  components: { Instruction, AdminNavigation, AdminFooter, AdminTopHeader },
  data() {
    return {
      sort: "-time",
      plans: [],
      planLength: "",
      limit: 4,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.planLength / this.limit);
        for (let i = 0; i < x.length; i++) {
          array.push("i");
        }
        return array;
      },
      currentPage: 1,

      planName: "",
      planPeriod: "Select",
      planDuration: "",
      planPercentage: "",
      planMinimum: "",
      planMaximum: "",
      planBanner: "",
      planDescription: "",
      planTags: [],
      planTag: "",
      planPeriodList: ["Daily", "Weekly", "Fortnightly", "Monthly", "Yearly"],
      referralCommission: "",
      showPlanPeriodList: false,

      response: "",
      responseState: false,
      height: 0,
      showResponse: false,

      editState: false,
      editId: "",
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

    formatMoney(number) {
      if (!number) {
        return "0.00";
      }
      return number.toLocaleString("en-US");
    },

    clearInputs() {
      this.editId = "";
      this.editState = false;
      this.planName = "";
      this.planPeriod = "Select";
      this.planDuration = "";
      this.planPercentage = "";
      this.planMinimum = "";
      this.planMaximum = "";
      this.planBanner = "";
      this.planDescription = "";
      this.planTags = "";
      this.referralCommission = "";
    },

    removeListItem(index) {
      this.planTags.splice(index, 1);
    },

    setPlanPeriod(item) {
      this.planPeriod = item;
      this.showPlanPeriodList = false;
    },

    populateTags() {
      this.planTags.push(this.planTag);
      this.planTag = "";
    },

    setPlanBanner(e) {
      this.planBanner = e.target.files[0];
    },

    getPlanCycle(data) {
      return 24 * 60 * 60 * 1000;
    },

    preparePlanEdit(plan) {
      this.editId = plan._id;
      this.editState = true;
      this.planName = plan.planName;
      this.planPeriod = plan.planPeriod;
      this.planDuration = plan.planDuration;
      this.planPercentage = plan.planPercentage;
      this.planMinimum = plan.planMinimum;
      this.planMaximum = plan.planMaximum;
      this.planBanner = plan.planBanner;
      this.planDescription = plan.planDescription;
      this.planTags = plan.planTags;
      this.referralCommission = plan.referralCommission;
    },

    processPlanData() {
      // const result = new ValidatePlan(
      //   this.planName,
      //   this.planPeriod,
      //   this.planDuration,
      //   this.planPercentage,
      //   this.planMinimum,
      //   this.planMaximum
      // )
      //   .validateName()
      //   .validatePeriod()
      //   .validateDuration()
      //   .validatePercentage()
      //   .validateMinimum()
      //   .validateMaximum();

      // const message = result.checkErrors();
      // if (message != "success") {
      //   this.showResponseMsg(message, false);
      // } else {

      // }
      const formData = new FormData();
      formData.append("planName", this.planName);
      formData.append("planPeriod", this.planPeriod);
      formData.append("planCycle", this.getPlanCycle(this.planPeriod));
      formData.append("planDuration", this.planDuration);
      formData.append("planPercentage", this.planPercentage);
      formData.append("planMinimum", this.planMinimum);
      formData.append("planMaximum", this.planMaximum);
      formData.append("planBanner", this.planBanner);
      formData.append("planDescription", this.planDescription);
      formData.append("referralCommission", this.referralCommission);
      formData.append("planTags", this.planTags);
      formData.append("time", new Date().getTime());

      if (this.editState) {
        this.updatePlan(formData);
      } else {
        this.createPlan(formData);
      }
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getPlans();
    },

    paginate(page) {
      this.currentPage = page;
      this.getPlans();
    },

    async togglePlanStatus(id, status) {
      const data = {
        planStatus: !status,
      };
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/plans/toggle-status/${id}/${query}`,
          data
        );
        this.plans = result.data.data;
        this.planLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response);
      }
    },

    async getPlans() {
      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.get(`/plans/${query}`);
        this.plans = result.data.data;
        this.planLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response);
      }
    },

    async updatePlan(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.patch(
          `/plans/${this.editId}/${query}`,
          form
        );
        this.clearInputs();
        this.plans = result.data.data;
        this.planLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response);
      }
    },

    async createPlan(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.post(`/plans/${query}`, form);
        this.showResponseMsg("Plan created successfully", true);
        this.plans = result.data.data;
        this.planLength = result.data.resultLength;
        this.clearInputs();
      } catch (err) {
        this.showResponseMsg(err.response.data, false);
      }
    },

    async deletePlan(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}`;
      try {
        const result = await this.$axios.delete(`/plans/${id}/${query}`);
        this.plans = result.data.data;
        this.planLength = result.data.resultLength;
      } catch (err) {
        this.showResponseMsg(err.response.data, false);
      }
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  mounted() {
    this.getPlans();
  },
};
</script>

<style></style>
