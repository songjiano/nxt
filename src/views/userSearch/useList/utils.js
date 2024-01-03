const status=[
    {
        t:'Non-Resident Only',
        e:'1'
    },
    {
        t:'Resident Only',
        e:'0'
    }
]

const detailList = [
    "nickname",
    "mail",
    "password",
    "accountExp",
    "resident",
    "credit",
]

export const isEdict = (parmes) => detailList.includes(parmes)

//状态转换
export const transSt=(params)=>{
    if(!params) return '-'
    const statusArr= status.filter(item=>item.e===params)
    return statusArr[0].t
}