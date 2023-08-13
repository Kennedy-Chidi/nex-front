<template>
  <div class="change-password-holder deposit">
    <div class="change-password">
      <dashboard-navigation />
      <div class="main-dash-board">
        <dashboard-header />
        <div class="profile-top-holder">
          <h1 class="main-heading ful">Profile</h1>
          <div class="profile-flex">
            <div
              v-if="avatar != ''"
              class="picture-holder"
              :style="{
                backgroundImage: ` url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <label for="picture">
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/643bfe657467a16ed74d14fc_edit-pen-icon%20(1)%201.svg"
                  loading="lazy"
                  alt=""
                  class="edit-img"
                />
                <input
                  type="file"
                  class="file-input"
                  id="picture"
                  accept=".png, .jpg, .jpeg"
                  @change="setProfile"
                />
              </label>
            </div>
            <div
              v-else-if="user.profilePicture"
              class="picture-holder"
              :style="{
                background: `url(${FILE_URL}/${user.profilePicture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <label for="picture">
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/643bfe657467a16ed74d14fc_edit-pen-icon%20(1)%201.svg"
                  loading="lazy"
                  alt=""
                  class="edit-img"
                />
                <input
                  type="file"
                  class="file-input"
                  id="picture"
                  @change="setProfile"
                />
              </label>
            </div>
            <div
              v-else
              class="picture-holder"
              :style="{
                backgroundImage: `url(/images/avatar.svg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <label for="picture">
                <img
                  src="https://uploads-ssl.webflow.com/64300ab9bc516802715bbe1b/643bfe657467a16ed74d14fc_edit-pen-icon%20(1)%201.svg"
                  loading="lazy"
                  alt=""
                  class="edit-img"
                />
                <input
                  type="file"
                  class="file-input"
                  @change="setProfile"
                  id="picture"
                  accept=".png, .jpg, .jpeg"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="profile-content-1">
          <div class="input-holder">
            <div class="profile-form w-form">
              <div>
                <div class="profile-form-content">
                  <div class="profile-form-holder">
                    <div class="sub-top-holder">
                      <h1 class="sub-heading">Personal Information</h1>
                    </div>
                    <div class="profile-inputs-holder">
                      <div class="profile-full-holder">
                        <input
                          type="text"
                          class="profile-text-input w-input"
                          maxlength="256"
                          :placeholder="`${user.firstName}`"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <input
                          type="text"
                          class="profile-text-input w-input"
                          maxlength="256"
                          :placeholder="`${user.lastName}`"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <input
                          type="text"
                          class="profile-text-input w-input"
                          maxlength="256"
                          :placeholder="`${user.username}`"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <input
                          type="tel"
                          class="profile-text-input w-input"
                          maxlength="256"
                          :placeholder="`${user.phoneNumber}`"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <input
                          type="email"
                          class="profile-text-input w-input"
                          maxlength="256"
                          :placeholder="`${user.email}`"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <input
                          type="text"
                          class="profile-text-input w-input"
                          maxlength="256"
                          :placeholder="`${user.country}`"
                        />
                      </div>

                      <div class="profile-full-holder com">
                        <div class="rate">
                          <h1 class="sub-heading comment">Make Comment</h1>
                          <input
                            type="number"
                            class="profile-text-input rating w-input"
                            maxlength="256"
                            v-model="rating"
                            placeholder="Rating"
                            @change="checkRating"
                          />
                        </div>
                        <textarea
                          placeholder="Write a Review About Us...."
                          maxlength="5000"
                          v-model="comment"
                          class="profile-text-input comment w-input"
                        >
                        </textarea>
                        <div class="erro-holder">
                          <div
                            v-if="showResponse"
                            :class="{ error: isError }"
                            class="erro-text"
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
                          @click="submitComment"
                          class="green-button w-button"
                          >Submit Review</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="profile-form-holder">
                    <div class="sub-top-holder">
                      <h1 class="sub-heading">Change Password</h1>
                    </div>
                    <div class="profile-inputs-holder">
                      <div class="profile-full-holder">
                        <label
                          for="username-2"
                          class="sign-label error oldPassword"
                          v-show="oldPasswordError"
                          >Passwords must be at least 6 characters</label
                        >
                        <input
                          type="password"
                          class="profile-text-input w-input"
                          maxlength="256"
                          name="password"
                          placeholder="Old Password"
                          v-model="oldPassword"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <label
                          for="username-2"
                          class="sign-label error password"
                          v-show="passwordError"
                          >Passwords must be at least 6 characters</label
                        >
                        <input
                          type="password"
                          class="profile-text-input w-input"
                          maxlength="256"
                          name="password"
                          placeholder="New Password"
                          v-model="password"
                        />
                      </div>
                      <div class="profile-full-holder">
                        <label
                          for="username-2"
                          class="sign-label error cPassword"
                          v-show="cPasswordError"
                          >Passwords do not match</label
                        >
                        <input
                          type="password"
                          class="profile-text-input w-input"
                          maxlength="256"
                          name="password-3"
                          placeholder="Confirm Password"
                          v-model="cPassword"
                        />
                      </div>

                      <div class="erro-holder">
                        <div
                          v-if="showResponse"
                          :class="{ error: isError }"
                          class="erro-text"
                        >
                          {{ response }}
                        </div>
                      </div>

                      <div class="profile-button-holder full">
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
                          @click="updatePassword"
                          class="green-button w-button"
                          >Update Password</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="profile-form-holder">
                    <div class="sub-top-holder">
                      <h1 class="sub-heading">Update Wallet</h1>
                    </div>
                    <div class="profile-inputs-holder wallet">
                      <div
                        v-for="wallet in wallets"
                        :key="wallet._id"
                        class="profile-full-holder"
                      >
                        <div class="wallet-name">{{ wallet.name }}</div>
                        <input
                          type="text"
                          class="profile-text-input"
                          maxlength="256"
                          placeholder="Set Wallet Address"
                          v-model="wallet.walletAddress"
                        />
                      </div>
                      <div class="erro-holder">
                        <div
                          v-if="showResponse"
                          :class="{ error: isError }"
                          class="erro-text"
                        >
                          {{ response }}
                        </div>
                      </div>
                      <div class="profile-button-holder full">
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
                          @click="updateWallet"
                          class="custom-btn w-button"
                          >Update Wallet</span
                        >
                      </div>
                    </div>
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
      oldPassword: "",
      password: "",
      cPassword: "",
      avatar: "",
      rating: 3.0,
      comment: "",

      showResponse: false,
      showReviewResponse: false,
      isError: false,
      response: "",
      onRequest: false,

      passwordError: false,
      cPasswordError: false,
      oldPasswordError: false,
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
      }, 6000);
    },

    checkErrorInputs(input, data) {
      if (input == "oldPassword") {
        if (data == "" || !data || data.length < 6) {
          const parent = this.$el.querySelector(".oldPassword");
          parent.classList.add("error");
          this.isError = false;
          this.oldPasswordError = true;
          this.onRequest = false;
          return false;
        } else {
          const parent = this.$el.querySelector(".oldPassword");
          parent.classList.remove("error");
          this.isError = true;
          this.oldPasswordError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data.length < 6) {
          const parent = this.$el.querySelector(".password");
          parent.classList.add("error");
          this.isError = false;
          this.passwordError = true;
          this.onRequest = false;
          return false;
        } else {
          const parent = this.$el.querySelector(".password");
          parent.classList.remove("error");
          this.isError = true;
          this.passwordError = false;
        }
      } else if (input == "cPassword") {
        if (data != this.password || data == "") {
          const parent = this.$el.querySelector(".cPassword");
          parent.classList.add("error");
          this.isError = false;
          this.cPasswordError = true;
          this.onRequest = false;
          return;
        } else {
          const parent = this.$el.querySelector(".cPassword");
          parent.classList.remove("error");
          this.isError = true;
          this.cPasswordError = false;
        }
      }
    },

    checkRating(e) {
      if (this.rating > 5) {
        this.rating = 5;
      } else if (this.rating < 2) {
        this.rating = 2;
      }
    },

    setArray() {
      this.checkArray = [
        { name: "oldPassword", data: this.oldPassword },
        { name: "password", data: this.password },
        { name: "cPassword", data: this.cPassword },
      ];
    },

    async setProfile(e) {
      const [file] = picture.files;
      this.avatar = URL.createObjectURL(file);
      const form = new FormData();
      form.append("profilePicture", file);

      console.log(file);

      try {
        await this.$axios.patch(`users/edit-picture/${this.user._id}`, form);
      } catch (err) {
        console.log(err.response);
      }
    },

    async updatePassword() {
      this.onRequest = true;
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (!this.isError) {
        return;
      }
      const form = {
        oldPassword: this.oldPassword,
        password: this.password,
        cPassword: this.cPassword,
      };

      try {
        await this.$axios.patch(`/users/update-password`, form);
        this.callResponse(
          "Your password has been updated, logout and login to continue",
          false
        );
      } catch (err) {
        this.callResponse(err, true);
      }
    },

    async submitComment() {
      this.onRequest = true;
      if (this.comment.trim().length < 30) {
        this.callResponse("Comment cannot be less than 30 characters", true);
        return;
      }
      const form = {
        username: this.user.username,
        profilePicture: this.user.profilePicture,
        rating: this.rating,
        commented: true,
        comment: this.comment,
        time: new Date().getTime(),
      };

      try {
        await this.$axios.patch(`/users/comment/${this.user.username}`, form);
        this.callResponse("Comment updates successfully.", false);
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },

    async updateWallet() {
      this.onRequest = true;
      const form = {
        wallets: this.wallets,
        user: this.user,
      };
      try {
        await this.$axios.patch(`/wallet`, form);
        this.callResponse("Wallet has been updated successfully", false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getWallets() {
      try {
        const result = await this.$axios.get(
          `/wallet/?username=${this.user.username}`
        );
        this.wallets = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },

    async getComment() {
      try {
        const result = await this.$axios.get(
          `/users/comment/?username=${this.user.username}`
        );
        this.rating = result.data.data.rating;
        this.comment = result.data.data.comment;
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },
  },

  mounted() {
    this.getWallets();
    this.getComment();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },

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
.erro-holder {
  width: 100%;
}

.picture-holder label {
  cursor: pointer;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
}

.place-holder {
  background-size: cover;
}

.profile-text-input {
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: #181320;
  border: 0 solid #000;
  border-radius: 3px;
  margin-bottom: 0;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
}
</style>
