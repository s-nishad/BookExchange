import api from "@/helpers/api";
import Cookies from "js-cookie";

const authModule = {
    namespaced: true,
    state: {
        user: Cookies.get("user") ? Cookies.get("user") : null,
        token: Cookies.get("token") ? Cookies.get("token") : null,
    },
    getters: {},
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        async register({ commit }, user) {
            commit("setLoading", true, { root: true })
            try {
                const response = await api.post("/auth/register", user);
                if (response.data.status === "failed") {
                    commit(
                        "setToast",
                        { show: true, message: response.data.message, type: "error" },
                        { root: true }
                    );
                    commit("setLoading", false, { root: true });
                } else {
                    Cookies.set("user", JSON.stringify(response.data.user), { expires: 7, path: "" });
                    Cookies.set("token", response.data.token, { expires: 7, path: "" });
                    setTimeout(() => {
                        window.location.href = "/explore";
                        commit(
                            "setToast",
                            { show: true, message: response.data.message, type: "success" },
                            { root: true }
                        );
                        commit("setLoading", false, { root: true });
                    }, 2000);
                }
            } catch (err) {
                commit("setLoading", false, { root: true });
                commit(
                    "setToast",
                    { show: true, message: err.message, type: "success" },
                    { root: true }
                );
                console.log(err.message);
            }
        },
        async login({ commit }, user) {
            commit("setLoading", true, { root: true });
            try {
                const response = await api.post("/auth/login", user);
                if (response.data.status === "failed") {
                    commit(
                        "setToast",
                        { show: true, message: response.data.message, type: "error" },
                        { root: true }
                    );
                    commit("setLoading", false, { root: true });
                } else {
                    Cookies.set("user", JSON.stringify(response.data.user), { expires: 7, path: "" });
                    Cookies.set("token", response.data.token, { expires: 7, path: "" });
                    setTimeout(() => {
                        window.location.href = "/explore";
                        commit(
                            "setToast",
                            { show: true, message: response.data.message, type: "success" },
                            { root: true }
                        );
                        commit("setLoading", false, { root: true });
                    }, 2000);
                }
            } catch (err) {
                commit(
                    "setToast",
                    { show: true, message: err.message, type: "error" },
                    { root: true }
                )
                commit("setLoading", false, { root: true });
                console.log(err.message);
            }
        }
    },
    modules: {}
};

export default authModule;