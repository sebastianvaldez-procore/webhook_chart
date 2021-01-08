import moment from 'moment';

export function dateRanges(dates) {
  const moments = dates.map(d => moment(d));
  const startDate = moment.min(moments);
  const endDate = moment.max(moments);

  var range = [];
  var currDate = moment(startDate).startOf('day');
  var lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    range.push(currDate.clone().toISOString());
  }

  return range;
}
