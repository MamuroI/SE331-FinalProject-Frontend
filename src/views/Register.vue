
<template>
  <div class="col-md-12 backdrop">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="firstname">Firstname</label>
            <Field name="firstname" type="text" class="form-control" />
            <ErrorMessage name="firstname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="lastname">Lastname</label>
            <Field name="lastname" type="text" class="form-control" />
            <ErrorMessage name="lastname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <Field name="address" type="text" class="form-control" />
            <ErrorMessage name="address" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <Field name="age" type="number" class="form-control" />
            <ErrorMessage name="age" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="img">Image</label>
            <UploadImages name="img" @changed="handleImages" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block mt-3" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UploadImages from "vue-upload-drop-images";
// eslint-disable-next-line
import AuthService from "@/services/AuthService.js";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    UploadImages,
  },
  // eslint-disable-next-line
  inject: ["GStore"],
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      firstname: yup
        .string()
        .required("Firstname is required!")
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!"),
      lastname: yup
        .string()
        .required("Lastname is required!")
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!"),
      address: yup
        .string()
        .required("Address is required!")
        .min(5, "Must be at least 5 characters!")
        .max(50, "Must be maximum 50 characters!"),
      age: yup.number().required("Age is required").min(1).max(120),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      files: [],
      imageUrls: [],
    };
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push("/event");
    }
  },
  methods: {
    // eslint-disable-next-line
    handleRegister(user) {
      // this.message = ''
      // this.successful = false
      // this.loading = true
      Promise.all(
        this.files.map((file) => {
          return AuthService.uploadFile(file);
        })
      ).then((response) => {
        this.imageUrls = response.map((r) => r.data);
        AuthService.register(user, this.imageUrls.toString())
          .then((response) => {
            this.GStore.flashMessage =
              "You are successfully registered for " + user.username;
            setTimeout(() => {
              // After 3 seconds remove it
              this.GStore.flashMessage = "";
            }, 3000);
            console.log(response);

            this.$router.push({ name: "Login" });
          })
          .catch(() => {
            this.message = "could not register";
          });
      });
    },
    handleImages(files) {
      this.files = files;
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 450px !important;
  padding: 40px 20px 40px 20px;
}

.card {
  background-color: pink;
  padding: 20px 25px 30px;
  margin: 0 auto 0;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}

.btn {
  background-color: salmon;
  border: 0;
}
.btn:hover {
  background-color: orangered;
  border: 0;
}
.backdrop {
  background-image: url("../assets/covid19jumbotron2.jpg");
  background-size: cover;
  background-position: center;
}
</style>
