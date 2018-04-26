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
Vue.use(VueRouter);

const routes =  [
  {
    path: '/',
    components: {
      body: Index
    },
    children: [
      {
        path:'/', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: Content
        }, 
      },
      {
        path:'/product', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: Product
        }, 
      },
      {
        path:'/examine', 
        components: {
          nav: Nav,
          header:Header,
          footer:Footer,
          content: Examine
        }, 
      }
      // { path: '/db/:bundleName', name: 'db', component: DB },
      // { path:'/examine', name:'exam', component: Exam },
      // { path:'/payExamine', name:'payExamine', component: payExamine },
      // { path:'/account', name:'account', component: Account },
    ]
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
