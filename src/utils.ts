export const {IS_DEVELOPMENT} = (function (search: string) {
  // IS_DEELOPMENT
  let is_development = process.env.NODE_ENV === 'development'
  let mo = search.match(/development=(.*)(&|$)/)
  if (mo) {
    try {
      is_development = Boolean(parseInt(mo[1]))
    } catch (e) {
      console.log('Invalid Config', mo[1])
    }
  }

  return {IS_DEVELOPMENT: is_development}
})(location.search)
