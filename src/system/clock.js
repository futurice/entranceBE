import moment from 'moment';

export default ()=> ({
  today: () => moment().startOf('day').toDate(),
  endOfToday: () => moment().endOf('day').toDate(),
});
