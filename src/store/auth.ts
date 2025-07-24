import { defineStore } from "pinia";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null as User | null,
  }),

  actions: {
    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
    },

    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
