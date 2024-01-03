const seachTypeData=[
  {
    label:"司机",
    value:"driver"
  },
  {
    label:"车牌号",
    value:"vechNum"
  },
]

export const transpingp=(value)=>{
  if(!value) return ""
  let seachTypeDataValue=""
  const seachTypeDataFilter= seachTypeData.filter(item=>value===item.value)
  if(seachTypeDataFilter.length>0)seachTypeDataValue=seachTypeDataFilter[0].label
  return seachTypeDataValue 
}


export const sortByClicknum=(parms=[])=>{
  const parmsType = parms instanceof Array
  if(!parmsType) return []
  const newArr=parms.sort((a,b)=>b.clicknum-a.clicknum)
  return newArr
}