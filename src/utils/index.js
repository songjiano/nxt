/*
 * @{content} 后端返回的数据
 * @{customFileName} 自定义的文件名称
 * @{type} 对应的MIME的类型 'application/vnd.ms-excel' 
*/
export function saveAs (content, customFileName, type) {
  let blob = new Blob([content], {type: type || 'application/vnd.ms-excel'}) // 默认excel
  let filename = content.filename || customFileName
  let URL = window.URL || window.webkitURL
  let objectUrl = URL.createObjectURL(blob)
  let a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}
