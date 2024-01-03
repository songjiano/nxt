import { ref } from 'vue'
import { defineStore } from 'pinia'

//储存运力管道数据查询条件
const useDataMoveStore = defineStore('dataMoves',() =>{
  const dataMove = ref({})
  function moveCoput(parmes:object) {
    dataMove.value={...dataMove.value,...parmes}
  }
  return { dataMove, moveCoput}
})
export default useDataMoveStore