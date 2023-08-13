<template>
  <div class="main-wrapper settings">
    <!-- <admin-confirmation :msg="confirmMsg" :state="confirmState" /> -->
    <admin-navigation />
    <div class="body-wrapper">
      <admin-top-header />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <div class="input-wrapper w-form">
            <div @submit.prevent="" action="#" class="input-form">
              <div class="each-input half down">
                <div v-for="(med, int) in media" :key="int" class="social-list">
                  <img
                    v-if="med.tempIcon"
                    :src="med.tempIcon"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <img v-else :src="`${FILE_URL}/${med.icon}`" alt="" />
                  <div>{{ med.text }}</div>
                  <img
                    src="/admin-images/edit-gray.svg"
                    @click="startEditTempState(int, media, 'media')"
                    loading="lazy"
                    alt=""
                    class="filter-icon check action-icon edit"
                  />

                  <img
                    src="/admin-images/delete-gray.svg"
                    loading="lazy"
                    alt=""
                    @click="removeTempState(int, 'media')"
                    class="filter-icon check action-icon delete"
                  />
                </div>

                <div class="social-holder">
                  <label for="media" class="upload-btn sm">
                    <img
                      src="/admin-images/white-upload.svg"
                      loading="lazy"
                      alt=""
                      class="upload-icon"
                    />
                    <input
                      id="media"
                      type="file"
                      class="file-input"
                      @change="setIcon($event, 'media')"
                    />
                  </label>
                  <input
                    type="text"
                    class="plan-input w-input"
                    maxlength="256"
                    v-model="mediaText"
                    @keypress.enter="
                      enterTempState(
                        media,
                        mediaText,
                        mediaTempIcon,
                        mediaIcon,
                        'media'
                      )
                    "
                    placeholder="Media Contact"
                  />
                </div>
              </div>

              <div class="each-input half down">
                <div
                  v-for="(med, int) in coloredMedia"
                  :key="int"
                  class="social-list"
                >
                  <img
                    v-if="med.tempIcon"
                    :src="med.tempIcon"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <img
                    v-else
                    :src="`${FILE_URL}/${med.icon}`"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <div>{{ med.text }}</div>
                  <img
                    src="/admin-images/edit-gray.svg"
                    @click="
                      startEditTempState(int, coloredMedia, 'coloredMedia')
                    "
                    loading="lazy"
                    alt=""
                    class="filter-icon check action-icon edit"
                  />

                  <img
                    src="/admin-images/delete-gray.svg"
                    loading="lazy"
                    alt=""
                    @click="removeTempState(int, 'coloredMedia')"
                    class="filter-icon check action-icon delete"
                  />
                </div>

                <div class="social-holder">
                  <label for="coloredMedia" class="upload-btn sm">
                    <img
                      src="/admin-images/white-upload.svg"
                      loading="lazy"
                      alt=""
                      class="upload-icon"
                    />
                    <input
                      id="coloredMedia"
                      type="file"
                      class="file-input"
                      @change="setIcon($event, 'coloredMedia')"
                    />
                  </label>
                  <input
                    type="text"
                    class="plan-input w-input"
                    maxlength="256"
                    v-model="coloredMediaText"
                    @keypress.enter="
                      enterTempState(
                        coloredMedia,
                        coloredMediaText,
                        coloredMediaTempIcon,
                        coloredMediaIcon,
                        'coloredMedia'
                      )
                    "
                    placeholder="Colored Media Contact"
                  />
                </div>
              </div>

              <div class="each-input half down">
                <div
                  v-for="(med, int) in socials"
                  :key="int"
                  class="social-list"
                >
                  <img
                    v-if="med.tempIcon"
                    :src="med.tempIcon"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <img
                    v-else
                    :src="`${FILE_URL}/${med.icon}`"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <div>{{ med.text }}</div>
                  <img
                    src="/admin-images/edit-gray.svg"
                    @click="editTempState(index, media, 'media')"
                    loading="lazy"
                    alt=""
                    class="filter-icon check action-icon edit"
                  />

                  <img
                    src="/admin-images/delete-gray.svg"
                    loading="lazy"
                    alt=""
                    @click="removeTempState(index, media, 'media')"
                    class="filter-icon check action-icon delete"
                  />
                </div>

                <div class="social-holder">
                  <label for="socials" class="upload-btn sm">
                    <img
                      src="/admin-images/white-upload.svg"
                      loading="lazy"
                      alt=""
                      class="upload-icon"
                    />
                    <input
                      id="socials"
                      type="file"
                      class="file-input"
                      @change="setIcon($event, 'socials')"
                    />
                  </label>
                  <input
                    type="text"
                    class="plan-input w-input"
                    maxlength="256"
                    v-model="socialText"
                    @keydown.enter="
                      enterTempState(
                        socials,
                        socialText,
                        socialTempIcon,
                        socialIcon,
                        'socials'
                      )
                    "
                    placeholder="Social Contact"
                  />
                </div>
              </div>

              <div class="each-input half down">
                <div
                  v-for="(med, int) in coloredSocials"
                  :key="int"
                  class="social-list"
                >
                  <img
                    v-if="med.tempIcon"
                    :src="med.tempIcon"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <img
                    v-else
                    :src="`${FILE_URL}/${med.icon}`"
                    loading="lazy"
                    alt=""
                    class="social-img"
                  />
                  <div>{{ med.text }}</div>
                  <img
                    src="/admin-images/edit-gray.svg"
                    @click="startEditTempState(int, socials, 'coloredSocials')"
                    loading="lazy"
                    alt=""
                    class="filter-icon check action-icon edit"
                  />

                  <img
                    src="/admin-images/delete-gray.svg"
                    loading="lazy"
                    alt=""
                    @click="removeTempState(int, 'coloredSocials')"
                    class="filter-icon check action-icon delete"
                  />
                </div>

                <div class="social-holder">
                  <label for="coloredSocial" class="upload-btn sm">
                    <img
                      src="/admin-images/white-upload.svg"
                      loading="lazy"
                      alt=""
                      class="upload-icon"
                    />
                    <input
                      id="coloredSocial"
                      type="file"
                      class="file-input"
                      @change="setIcon($event, 'coloredSocials')"
                    />
                  </label>
                  <input
                    type="text"
                    class="plan-input w-input"
                    maxlength="256"
                    v-model="coloredSocialText"
                    @keypress.enter="
                      enterTempState(
                        coloredSocials,
                        coloredSocialText,
                        coloredSocialTempIcon,
                        coloredSocialIcon,
                        'coloredSocials'
                      )
                    "
                    placeholder="Colored Social Contact"
                  />
                </div>
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >Company Name<span class="important">*</span></label
                ><input
                  type="text"
                  class="plan-input w-input"
                  maxlength="256"
                  v-model="companyName"
                  placeholder="Enter Company Name"
                />
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >System Email<span class="important">*</span></label
                ><input
                  type="email"
                  class="plan-input w-input"
                  v-model="systemEmail"
                  placeholder="Enter system Email"
                />
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >Company's Domain<span class="important">*</span></label
                ><input
                  type="text"
                  class="plan-input w-input"
                  v-model="companyDomain"
                  placeholder="Enter company domain"
                />
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >Day Started<span class="important">*</span></label
                ><input
                  type="date"
                  class="plan-input w-input"
                  v-model="dayStarted"
                />
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >Total Members<span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  v-model="totalMembers"
                  placeholder="Enter Total Members"
                />
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >Online Members<span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  v-model="onlineMembers"
                  placeholder="Enter online Members"
                />
              </div>

              <div class="each-input half down">
                <label for="email-3" class="input-label"
                  >Active Members<span class="important">*</span></label
                ><input
                  type="number"
                  class="plan-input w-input"
                  v-model="activeMembers"
                  placeholder="Enter Active Members"
                />
              </div>

              <div
                class="response"
                v-if="showResponse"
                :class="{ success: responseState }"
              >
                {{ response }}
              </div>

              <div class="button-holder">
                <input
                  type="button"
                  value="Save"
                  @click="processData"
                  class="button w-button"
                />

                <input
                  type="submit"
                  @click="resetUsers"
                  value="Reset Users"
                  class="button w-button"
                />

                <input
                  type="submit"
                  @click="testCoinpayment"
                  value="Test Coinpayment"
                  class="button w-button"
                />
              </div>
            </div>
          </div>
        </div>
        <instruction />
      </div>
      <div class="content-wrapper"></div>
      <admin-footer />
    </div>
  </div>
</template>

<script>
import AdminFooter from "../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../components/AdminComponents/AdminNavigation.vue";
import AdminTopHeader from "../../components/AdminComponents/AdminTopHeader.vue";
import AdminConfirmation from "../../components/AdminComponents/AdminConfirmation.vue";
import Instruction from "../../components/AdminComponents/Instruction.vue";
export default {
  data() {
    return {
      company: "",
      companyName: "",
      companyDomain: "",
      systemEmail: "",
      dayStarted: 0,
      onlineMembers: 0,
      totalMembers: 0,
      activeMembers: 0,

      socialText: "",
      socialIcon: "",
      socialTempIcon: "",
      socials: [],

      coloredSocialTempIcon: "",
      coloredSocialIcon: "",
      coloredSocials: [],
      coloredSocialText: "",

      mediaText: "",
      mediaIcon: "",
      mediaTempIcon: "",
      media: [],

      coloredMediaText: "",
      coloredMediaIcon: "",
      coloredMediaTempIcon: "",
      coloredMedia: [],

      editTempState: false,
      editingId: "",

      editingTempState: false,
      editingTempIndex: "",

      response: "",
      responseState: false,
      showResponse: false,

      editingState: false,
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
      this.editingTempIndex = "";
      this.editingTempState = false;
      this.socials = [];
      this.coloredSocials = [];
      this.media = [];
      this.coloredMedia = [];
      this.companyDomain = "";
      this.systemEmail = "";
      this.companyName = "";
    },

    setIcon(event, type) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        if (type == "socials") {
          reader.onload = (e) => {
            this.socialIcon = input.files[0];
            this.socialTempIcon = e.target.result;
          };
        } else if (type == "coloredSocials") {
          reader.onload = (e) => {
            this.coloredSocialIcon = input.files[0];
            this.coloredSocialTempIcon = e.target.result;
          };
        } else if (type == "media") {
          reader.onload = (e) => {
            this.mediaIcon = input.files[0];
            this.mediaTempIcon = e.target.result;
          };
        } else if (type == "coloredMedia") {
          reader.onload = (e) => {
            this.coloredMediaIcon = input.files[0];
            this.coloredMediaTempIcon = e.target.result;
          };
        }

        reader.readAsDataURL(input.files[0]);
      }
    },

    htmlDateFormat(data) {
      const date = new Date(data);
      return date.toISOString().slice(0, 10);
    },

    clearType(type) {
      this.editingTempState = false;
      if (type == "socials") {
        this.socialIcon = "";
        this.socialText = "";
        this.socialTempIcon = "";
      } else if (type == "coloredSocial") {
        this.coloredSocialIcon = "";
        this.coloredSocialText = "";
        this.coloredSocialTempIcon = "";
      } else if (type == "media") {
        this.mediaIcon = "";
        this.mediaText = "";
        this.mediaTempIcon = "";
      } else if (type == "coloredMedia") {
        this.coloredMediaIcon = "";
        this.coloredMediaText = "";
        this.coloredMediaTempIcon = "";
      }
    },

    enterTempState(array, receivedText, receivedTempIcon, receivedIcon, type) {
      if (receivedTempIcon != "") {
        const data = {
          text: receivedText,
          tempIcon: receivedTempIcon,
          icon: receivedIcon,
        };

        if (this.editingTempState) {
          array.splice(this.editingTempIndex, 1, data);
        } else {
          const existingObj = array.find((item) => item.text === data.text);
          if (existingObj) {
            this.showResponseMsg("Named item already exist", true);
          } else {
            array.push(data);
          }
        }
        this.clearType(type);
      } else {
        this.showResponseMsg("Please select icon first", true);
      }
    },

    removeTempState(index, type) {
      if (type == "socials") {
        this.socials.splice(index, 1);
      } else if (type == "coloredSocials") {
        this.coloredSocials.splice(index, 1);
      } else if (type == "media") {
        this.media.splice(index, 1);
      } else if (type == "coloredMedia") {
        this.coloredMedia.splice(index, 1);
      }
    },

    startEditTempState(index, array, type) {
      this.editingTempState = true;
      this.editingTempIndex = index;
      const item = array[index];
      if (type == "socials") {
        this.socialIcon = item.icon;
        this.socialText = item.text;
        this.socialTempIcon = item.tempIcon;
      } else if (type == "coloredSocials") {
        this.coloredMediaIcon = item.icon;
        this.coloredSocialText = item.text;
        this.coloredSocialTempIcon = item.tempIcon;
      } else if (type == "media") {
        this.mediaText = item.text;
        this.mediaTempIcon = item.tempIcon;
        this.mediaIcon = item.icon;
      } else if (type == "coloredMedia") {
        this.coloredMediaText = item.text;
        this.coloredMediaTempIcon = item.tempIcon;
        this.coloredMediaIcon = item.icon;
      }
    },

    populateData(company) {
      this.editingId = company._id;
      this.companyDomain = company.companyDomain;
      this.companyName = company.companyName;
      this.systemEmail = company.systemEmail;
      this.totalMembers = company.totalMembers;
      this.onlineMembers = company.onlineMembers;
      this.activeMembers = company.activeMembers;
      this.dayStarted = this.htmlDateFormat(company.dayStarted);
      this.socials = company.socials;
      this.coloredSocials = company.coloredSocials;
      this.media = company.media;
      this.coloredMedia = company.coloredMedia;
    },

    processData() {
      const form = new FormData();
      form.append("companyName", this.companyName);
      form.append("systemEmail", this.systemEmail);
      form.append("companyDomain", this.companyDomain);
      form.append("dayStarted", new Date(this.dayStarted).getTime());
      form.append("totalMembers", this.totalMembers);
      form.append("onlineMembers", this.onlineMembers);
      form.append("activeMembers", this.activeMembers);
      this.socials.forEach((el) => {
        form.append("socialIcon", el.icon);
        form.append("socialText", el.text);
      });
      this.coloredSocials.forEach((el) => {
        form.append("coloredSocialIcon", el.icon);
        form.append("coloredSocialText", el.text);
      });
      this.media.forEach((el) => {
        form.append("mediaIcon", el.icon);
        form.append("mediaText", el.text);
      });
      this.coloredMedia.forEach((el) => {
        form.append("coloredMediaIcon", el.icon);
        form.append("coloredMediaText", el.text);
      });
      if (this.editingId != "") {
        this.updateCompany(form);
      } else {
        this.createCompany(form);
      }
    },

    async testCoinpayment() {
      const form = {
        ipn_version: "1.0",
        ipn_type: "button",
        merchant: "e4d65107efb4a4e6354264e73d30fb48",
        status: "100",
        status_text: "Payment Complete",
        txn_id: "1234567890",
        item_name: "Example Product",
        amount1: "0.005",
        amount2: "0.01",
        currency1: "USD",
        currency2: "ETH",
        custom: "776641ed-bf2a-41f1-9451-dd149bd66744",
        ipn_id: "9876543210",
      };

      try {
        const result = await this.$axios.post(
          `/transactions/create-payment`,
          form
        );
        this.showResponseMsg("Callback received successfully.", true);
      } catch (err) {
        this.showResponseMsg(err.response.data.message, true);
      }
    },

    async resetUsers() {
      try {
        const result = await this.$axios.get(`/users/reset`);
        this.showResponseMsg("Users data were reset successfully.", true);
      } catch (err) {
        this.showResponseMsg(err, true);
      }
    },

    async updateCompany(form) {
      try {
        const result = await this.$axios.patch(
          `/company/${this.editingId}`,
          form
        );
        this.showResponseMsg("Data updated successfully.", true);
        this.clearInputs();
        this.populateData(result.data.data);
      } catch (err) {
        this.showResponseMsg(err, true);
      }
    },

    async createCompany(form) {
      try {
        const result = await this.$axios.post("/company", form);
        this.showResponseMsg("The data was created successfully", true);
        this.populateData(result.data.data);
      } catch (err) {
        this.showResponseMsg(err.response.data.message, true);
      }
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        if (result.data.data != undefined) {
          this.populateData(result.data.data);
        }
      } catch (err) {
        this.showResponseMsg(err.response.data.message, true);
      }
    },
  },

  mounted() {
    this.getCompany();
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  components: {
    AdminConfirmation,
    Instruction,
    AdminNavigation,
    AdminTopHeader,
    AdminFooter,
  },
};
</script>

<style>
.social-list {
  position: relative;
}

.social-list img {
  max-width: 25px;
}

.social-list .action-icon {
  position: absolute;
  top: 5px;
  cursor: pointer;
}
.social-list .delete {
  right: 10px;
}

.social-list .edit {
  right: 30px;
}

.contact-icons {
  width: 15px;
}
</style>
