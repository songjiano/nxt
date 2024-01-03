import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

//储存运力管道数据查询条件
export const useDataMoveStore = defineStore('dataMoves',() =>{
  const dataMove = ref({
    timeSpan:undefined,
    deptCode:undefined,
    fieldValue:undefined,
    deptUumsids:undefined
  })
  function moveCoput(parmes) {
    dataMove.value=parmes
  }
  return { dataMove, moveCoput}
})

//储存个人信息
export const useUserInforStore = defineStore('userInfor', () => {
  const userData = ref({})
  function userInforAction(parmes) {
    userData.value=parmes
  }

  return { userData, userInforAction }
})

