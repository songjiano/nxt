const status = [
  {
    t: "Non-Resident Only",
    e: "1",
  },
  {
    t: "Resident Only",
    e: "0",
  },
];

const detailList = [
  "nickname",
  "mail",
  "password",
  "accountExp",
  "resident",
  "credit",
];

export const BarcodeSettingsColumns = [
  {
    prop:"nickname",
    label:"Name"
  },
  {
    prop:"status",
    label:"Name"
  },
  {
    prop:"nickname",
    label:"Name"
  },
  {
    prop:"nickname",
    label:"Name"
  },
  {
    prop:"nickname",
    label:"Name"
  },
  {
    prop:"nickname",
    label:"Name"
  },
];

export const isEdict = (parmes) => detailList.includes(parmes);

//状态转换
export const transSt = (params) => {
  if (!params) return "-";
  const statusArr = status.filter((item) => item.e === params);
  return statusArr[0].t;
};

//拼接图片
export const getImage=(parmes)=>{
  return import.meta.env.VITE_APP_BASE_URL+'/'+parmes
}