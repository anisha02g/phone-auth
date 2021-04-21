import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from "vue-router";
import firebase from "firebase";
import 'firebase/auth'

import Login from "./components/login";
import Dashboard from "./components/dashboard";

Vue.use(VueRouter)

const routes=[
  {
    path:"/",
    name:"login",
    component:Login,

  },
  {
    path:"/dashboard",
    name:"dashboard",
    component:Dashboard,
    meta:{requiresAuth:true}
  }
]



//Your Firebase Config Api key Here
var firebaseConfig = {
  apiKey: "AIzaSyCC2ji55RqIL9N6Cnrrc0jWLNUytFbDdhk",
  authDomain: "phone-auth-ad13c.firebaseapp.com",
  databaseURL: "https://phone-auth-ad13c-default-rtdb.firebaseio.com",
  projectId: "phone-auth-ad13c",
  storageBucket: "phone-auth-ad13c.appspot.com",
  messagingSenderId: "828469689676",
  appId: "1:828469689676:web:99a836e77e90e5f2c263e9",
  measurementId: "G-TTFSXW7YNK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const router = new VueRouter({
  mode:'history',
  base:process.env.BASE_URL,
  routes
})

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{

  const requiresAuth = to.matched.some(record=>record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(requiresAuth && !isAuthenticated)
  {
    next('/')
  }
  else
  {
    next()
  }
  if(!requiresAuth && isAuthenticated)
  {
    next('/dashboard')
  }
  else
  {
    next()
  }
})

new Vue({
  router,  
  render: h => h(App),
}).$mount('#app')