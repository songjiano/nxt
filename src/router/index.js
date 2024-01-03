import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/index.vue'
import Lndex from '../views/index/index.vue'


import useuserInforStore  from "@/stores/useInfor";
import useDeviceInfoStore  from "@/stores/deviceInfor";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/logList',
      name: 'logList',
      component: () => import('../views/userSearch/logList.vue')
    },
    {
      path: '/userList',
      name: 'userList',
      meta:{keepAlive:true},
      component: () => import('../views/userSearch/userList.vue')
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: () => import('../views/userSearch/userDetail.vue')
    },
    {
      path: '/nameplat',
      name: 'nameplat',
      component: () => import('../views/userSearch/nameplat.vue')
    },
    {
      path: '/guild',
      name: 'guild',
      component: () => import('../views/userSearch/guild.vue')
    },
    {
      path: '/hall',
      name: 'hall',
      component: () => import('../views/userSearch/hall.vue')
    },
    {
      path: '/discount',
      name: 'discount',
      component: () => import('../views/userSearch/discount.vue')
    },
    {
      path: '/prizeDraw',
      name: 'prizeDraw',
      component: () => import('../views/userSearch/prizeDraw.vue')
    },
    {
      path: '/barcode',
      name: 'barcode',
      component: () => import('../views/userSearch/barcode.vue')
    },
    {
      path: '/admins',
      name: 'admins',
      component: () => import('../views/userSearch/admins.vue')
    },
    {
      path: '/system/layout',
      name: 'Layout',
      component: () => import('../views/layout/index.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: Lndex
    },
    // {
    //   path: '/dispatchCar',
    //   name: 'dispatchCar',
    //   component: () => import('../views/dispatchCar/index.vue')
    // },
    // {
    //   path: '/dispatchCarDetail',
    //   name: 'dispatchCarDetail',
    //   component: () => import('../views/dispatchCar/dispatchCarDetail.vue')
    // },
    // {
    //   path: '/newBonus',
    //   name: 'newBonus',
    //   component: () => import('../views/bonusCommission/newBonus.vue')
    // },
  ]
})

router.beforeEach((to, from, next) => {
  return next();
})

export default router
