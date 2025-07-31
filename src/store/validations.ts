import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useAuthFormStore } from "./authForm";

export const useValidationStore = defineStore("validation", () => {
  // states for forms
  const email = ref("");
  const password = ref("");
  const name = ref("");
  const image = ref<File | null>(null); // for registration

  // states
  const emailError = ref("");
  const passwordError = ref("");
  const nameError = ref("");
  const imageError = ref("");
  const isLoginFormValid = ref(false);
  const isRegisterFormValid = ref(false);
  const newPassword = ref("");
  const oldPassword = ref("");
  const newPasswordError = ref("");
  const oldPasswordError = ref("");

  const isChangePasswordFormValid = ref(false);

  const authFormStore = useAuthFormStore();
  const { handleLogin, handleRegister } = authFormStore;

  // email validation logic
  function validateEmail() {
    if (!email.value) {
      emailError.value = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      emailError.value = "Invalid email format";
    } else {
      emailError.value = "";
    }

    checkLoginFormValidity();
    checkRegisterFormValidity();
  }

  // password validation logic
  function validatePassword() {
    if (!password.value) {
      passwordError.value = "Password is required";
    } else if (password.value.length < 8) {
      passwordError.value = "Password must be at least 8 characters long";
    } else {
      passwordError.value = "";
    }

    checkLoginFormValidity();
    checkRegisterFormValidity();
  }

  // name validation logic
  function validateName() {
    if (!name.value.trim()) {
      nameError.value = "Name is required";
    } else if (name.value.trim().length < 1) {
      nameError.value = "Name must be at least 2 characters long";
    } else {
      nameError.value = "";
    }

    checkRegisterFormValidity();
  }

  // validating login form
  function checkLoginFormValidity() {
    isLoginFormValid.value =
      !emailError.value &&
      !passwordError.value &&
      email.value.trim() !== "" &&
      password.value !== "";
  }

  // validating register form
  function checkRegisterFormValidity() {
    isRegisterFormValid.value =
      !emailError.value &&
      !passwordError.value &&
      !nameError.value &&
      !imageError.value &&
      email.value.trim() !== "" &&
      password.value !== "" &&
      name.value.trim() !== "";
  }

  // handling login submit form
  function handleLoginSubmit() {
    validateEmail();
    validatePassword();

    if (isLoginFormValid.value) {
      // handle login logic
      handleLogin({
        email: email.value,
        password: password.value,
      });
    }
  }

  // handling register submit form
  function handleRegisterSubmit() {
    validateName();
    validateEmail();
    validatePassword();
    validateImageFile(image.value);

    if (isRegisterFormValid.value) {
      const formData = new FormData();
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("name", name.value);
      if (image.value) formData.append("image", image.value);

      handleRegister(formData);
    }
  }

  // validating image
  function validateImageFile(file: File | null) {
    image.value = file;

    if (!file) {
      imageError.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      imageError.value = "Only JPG, JPEG, and PNG formats are allowed";
    } else {
      imageError.value = "";
    }

    checkRegisterFormValidity();
  }

  function validateOldPassword() {
    if (!oldPassword.value) {
      oldPasswordError.value = "Old password is required";
    } else {
      oldPasswordError.value = "";
    }
  }

  function validateNewPassword() {
    if (!newPassword.value) {
      newPasswordError.value = "New password is required";
    } else if (newPassword.value.length < 8) {
      newPasswordError.value =
        "New password must be at least 8 characters long";
    } else {
      newPasswordError.value = "";
    }
  }

  function checkChangePasswordFormValidity() {
    isChangePasswordFormValid.value =
      !oldPasswordError.value &&
      !newPasswordError.value &&
      oldPassword.value !== "" &&
      newPassword.value !== "";
  }

  function handleChangePasswordSubmit(
    submitFn: (data: { oldPassword: string; newPassword: string }) => void
  ) {
    validateOldPassword();
    validateNewPassword();
    checkChangePasswordFormValidity();

    if (isChangePasswordFormValid.value) {
      submitFn({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      });
    }
  }

  watch([oldPassword, newPassword, oldPasswordError, newPasswordError], () => {
    checkChangePasswordFormValidity();
  });

  return {
    email,
    name,
    password,
    image,
    newPassword,
    oldPassword,

    emailError,
    nameError,
    imageError,
    passwordError,
    newPasswordError,
    oldPasswordError,

    validateEmail,
    validatePassword,
    validateImageFile,
    validateName,
    validateOldPassword,
    validateNewPassword,

    isLoginFormValid,
    isRegisterFormValid,
    isChangePasswordFormValid,

    handleLoginSubmit,
    handleRegisterSubmit,
    handleChangePasswordSubmit,
  };
});
