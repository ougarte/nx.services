import day from 'dayjs';
import format from 'dayjs/plugin/customParseFormat';

// DayJS initializing
day.extend(format);

export const ISODateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
