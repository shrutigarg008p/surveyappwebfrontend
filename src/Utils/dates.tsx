import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD - hh:mm A';
const DATE_FORMAT_INPUT_TAG = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_WITHOUT_TIME = 'YYYY-MM-DD';
const SECOND_TO_HOURS_DURATION = 'H[h] m[m]';
const SECOND_TO_MINS_DURATION = 'm[m] s[s]';
const TIME_FORMAT = 'hh:mm A';

type DateIn = Date | moment.Moment | string | number | undefined | null;

export function utcToLocal(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(DATE_FORMAT)
    : defaultValue;
}

export function inputUTCToLocal(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(DATE_FORMAT_INPUT_TAG)
    : defaultValue;
}

export function inputUTCToLocalNullable(
  date: DateIn,
  defaultValue: string | null = 'N/A',
): string | null {
  return moment(date).isValid()
    ? moment(date).local().format(DATE_FORMAT_INPUT_TAG)
    : defaultValue;
}

export function inputFormat(
  date: moment.Moment,
  defaultValue = 'N/A',
): string {
  return date.isValid()
    ? date.format(DATE_FORMAT_INPUT_TAG)
    : defaultValue;
}

export function utcToLocalWithoutTime(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(DATE_FORMAT_WITHOUT_TIME)
    : defaultValue;
}

export function withoutTime(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).format(DATE_FORMAT_WITHOUT_TIME)
    : defaultValue;
}

export function localToUTC(
  date: DateIn,
  defaultValue = null,
): moment.Moment | null {
  return moment(date).isValid()
    ? moment(date).utc()
    : defaultValue;
}

export function secondsToDuration(
  seconds: number,
  defaultValue = 'N/A',
): string {
  if (seconds < 3600) {
    return moment.utc(seconds * 1000).format(SECOND_TO_MINS_DURATION);
  }
  if (seconds >= 3600) {
    return moment.utc(seconds * 1000).format(SECOND_TO_HOURS_DURATION);
  }
  return defaultValue;
}

export function utcToLocalOnlyTime(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(TIME_FORMAT)
    : defaultValue;
}

export function onlyTime(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).format(TIME_FORMAT)
    : defaultValue;
}

export function utcUnixToLocalOnlyTime(
  date: number,
  defaultValue = 'N/A',
): string {
  return moment.unix(date).isValid()
    ? moment.unix(date).local().format(TIME_FORMAT)
    : defaultValue;
}

export function utcToLocalFormatted(
  date: DateIn,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? `${moment(date).local().format('DD MMMM YYYY')}`
    + ` at ${moment(date).local().format('hh:mm A')}`
    : defaultValue;
}
