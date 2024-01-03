const status = [
  {
    t: "Physical Item",
    e: "1",
  },
  {
    t: "Gift Card",
    e: "2",
  },
  {
    t: "EXP",
    e: "3",
  },
  {
    t: "Credit",
    e: "4",
  },
];

const residentType = [
  {
    t: "NO",
    e: 0,
  },
  {
    t: "YES",
    e: 1,
  },
]

const detailList = [
  "nickname",
  "mail",
  "password",
  "accountExp",
  "resident",
  "credit",
];

//奖项表单
export const prizeDrawColumns = [
  {
    prop:"name",
    label:"Name"
  },
  {
    prop:"creditCost",
    label:"Draw Credit Cost",
    type:"number" 
  },
  {
    prop:"creditMultiplier",
    label:"Cost Increase Per Draw",
    type:"number" 
  },
  {
    prop:"dailyFreeLimit",
    label:"Daily Free Draws",
    type:"number" 
  },
  {
    prop:"dailyLimit",
    label:"Max Daily Draws",
    type:"number" 
  },
  {
    prop:"remark",
    label:"remark"
  },
];

//奖品表单
export const prizeItemColumns = [
  {
    prop:"title",
    label:"Title",
    type:"text"
  },
  {
    prop:"type",
    label:"Type",
    type:"select",
    option:[
      {
        value: "1",
        label: "Physical Item",
      },
      {
        value: "2",
        label: "Gift Card",
      },
      {
        value: "3",
        label: "EXP",
      },
      {
        value: "4",
        label: "Credit",
      },
    ]
  },
  {
    prop:"subtitle",
    label:"Subtile",
    type:"text" 
  },
  {
    prop:"amount",
    label:"Amount",
    type:"number" 
  },
  {
    prop:"resident",
    label:"Require Resident",
    type:"select",
    option:[
      {
        value: "0",
        label: "NO"
      },
      {
        value: "1",
        label: "YES"
      }
    ]
  },
  {
    prop:"probability",
    label:"Probability",
    type:"number" 
  },
  {
    prop:"weeklyQuantity",
    label:"Limit Per Week",
    type:"number" 
  },
  {
    prop:"position",
    label:"Position",
    type:"select",
    option:[
      {value: "1",
      label: "1"},
      {value: "2",
      label: "2"},
      {value: "3",
      label: "3"},
      {value: "4",
      label: "4"},
      {value: "5",
      label: "5"},
    ]
  },
  {
    prop:"remark",
    label:"Remark",
    type:"text"
  },
  {
    prop:"imageUrl",
    label:"Prize lmage"
  },
  
];
export const isEdict = (parmes) => detailList.includes(parmes);

//状态转换
export const transSt = (params) => {
  if (!params) return "-";
  const statusArr = status.filter((item) => item.e === params);
  return statusArr[0].t;
};

//组册状态转换
export const transResident = (params) => {
  if (!params) return "-";
  const statusArr = residentType.filter((item) => item.e == params);
  return statusArr[0].t;
};

//拼接图片
export const getImage=(parmes)=>{
  return import.meta.env.VITE_APP_BASE_URL+'/'+parmes
}