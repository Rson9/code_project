import moment from 'moment';
moment.locale('zh_cn')
const momentTime = {
  getTime: time => moment(time).format("YYYY年M月DD日 hh:mm")
}
export default momentTime
