interface etocAll{
  readonly t?:string,
  readonly e?:string
}[]

//英转中文
export const etoc = (e: string, all: Array<etocAll>) => {
  if (!(e && all)) return "";
  all.filter((item)=>item.e===e)
  return all[0].t
};

//中文转英
export const ctoe = (t: string, all: Array<etocAll>) => {
  if (!(t && all)) return "";
  all.filter((item)=>item.t===t)
  return all[0].e
};

//时间转换
function toDate(date:Date) {
  if (date === undefined || date === null) {
      date = new Date();
  }
  if (!(date instanceof Date)) {
      date = new Date(date);
  }
  return date;
}

export function formatDate(date:any, format = 'yyyy-MM-dd hh:mm:ss') {
  if(date&&date.length)date=date.replace(/-/g, '/')
  date = toDate(date);
 
  let test:any;
  // 年
  let testYear = /y{2,4}/;
  while ((test = testYear.exec(format))) {
      let replaceStr = test[0].length === 2 ? date.getFullYear() % 100 : date.getFullYear();
      format = format.replace(test[0], replaceStr);
  }
  // 月，日，时，分，秒
  const other = {
      'M{1,2}': date.getMonth() + 1,
      'd{1,2}': date.getDate(),
      'h{1,2}': date.getHours(),
      'm{1,2}': date.getMinutes(),
      's{1,2}': date.getSeconds()
  };

  for (let i in other) {
      while ((test = new RegExp(i).exec(format))) {
          let replaceStr:string;
          if (test[0].length === 1) {
              replaceStr = other[i];
          } else {
              replaceStr = ('00' + other[i]).substr(-2, 2);
          }
          format = format.replace(test[0], replaceStr);
      }
  }
  return format;
}

interface localUrlType{
  url:string,
  type:string
}

export const urlRole=(url:string)=>{
  const localUrl = localStorage.getItem("nxtMenus")
  if(!localUrl)return ''
  const localUrlArry:localUrlType[]=JSON.parse(localUrl)
  const curentmunu:localUrlType[] = localUrlArry.filter((item:localUrlType)=>item.url===url)
  if(curentmunu.length<1) return ''
  return curentmunu[0].type
}

export const getRoleType = (type:string)=>{
  const nxtTokenType = localStorage.getItem("nxtToken")
  if(!nxtTokenType)return ''
  const typeRole = JSON.parse(nxtTokenType)[type]
  return typeRole
}
