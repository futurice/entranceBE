import moment from 'moment';

import Clock from '../../src/system/clock';

describe('clock wrapper', () => {
  const now = moment('2019-04-05 12:34:56.789');
  const today = moment('2019-04-05 00:00:00.000');
  const endOfToday = moment('2019-04-05 23:59:59.999');

  const clock = Clock(() => now);

  it('returns the beginning of the day', () => {
    expect(clock.today()).toEqual(today.toDate());
  });

  it('returns the end of the day', () => {
    expect(clock.endOfToday()).toEqual(endOfToday.toDate());
  });
});
