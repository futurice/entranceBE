import moment from 'moment';

export default (now = moment) => ({
  today: () =>
    now()
      .startOf('day')
      .toDate(),
  endOfToday: () =>
    now()
      .endOf('day')
      .toDate(),
});
