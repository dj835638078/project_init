import service from './service.js'

export function getTestData (data) {
  return service({
    url: './mock/test.json',
    method: 'get',
    data
  })
}
