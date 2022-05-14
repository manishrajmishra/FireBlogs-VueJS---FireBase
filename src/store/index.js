import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "Nov 1 2021",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "Nov 2 2021",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "Nov 3 2021",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "Nov 4 2021",
      },
    ],
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    NEW_BLOG_POST(state, payload) {
      state.blogHTML = payload;
    },
    UPDATE_BLOG_POST_TITLE(state, payload) {
      state.blogTitle = payload;
    },
    FILE_NAME_CHANGE(state, payload) {
      state.blogPhotoName = payload;
    },
    CREATE_FILE_URL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    OPEN_PHOTO_PREVIEW(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    TOGGLE_EDIT_POST(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    SET_PROFILE_INFO(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.data().email;
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().userName;
    },
    SET_PROFILE_INITIALS(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    CHANGE_FIRST_NAME(state, payload) {
      state.profileFirstName = payload;
    },
    CHANGE_LAST_NAME(state, payload) {
      state.profileLastName = payload;
    },
    CHANGE_USER_NAME(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("SET_PROFILE_INFO", dbResults);
      commit("SET_PROFILE_INITIALS");
      console.log(dbResults);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("SET_PROFILE_INITIALS");
    },
    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
  },
  modules: {},
});
