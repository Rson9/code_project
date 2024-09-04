import moment from 'moment'
moment.locale("zh_cn")
const formatTime = {
  getTime: (date) => {
    return moment(date).format('YYYY/MM/DD')
  }
}
export default formatTime