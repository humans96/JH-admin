import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from 'components/index.vue';
import Nav from 'components/default/nav.vue';
import Header from 'components/default/header.vue';
import Footer from 'components/default/footer.vue';
import Content from 'components/default/content.vue';
import Product from 'components/product.vue';
import Order from 'components/order.vue';
import Examine from 'components/examine.vue';
import Login from 'components/login.vue';
import User from 'components/user.vue';
Vue.use(VueRouter);

const routes =  [
  {
    path: '/admin',
    components: {
      body: Index
    },
    children: [
      {
        path:'/admin', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: Content
        }, 
      },
      {
        path:'/admin/product', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: Product
        }, 
      },
      {
        path:'/admin/examine', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: Examine
        }, 
      },
      {
        path:'/admin/user', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: User
        }, 
      }
    ]
  },
  {
    path:'/',
    components:{
      body: Login
    }
  }
];

export default new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
