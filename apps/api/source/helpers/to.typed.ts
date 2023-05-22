import validator from 'validator';
import * as _ from 'lodash';
import day from 'dayjs';
import { ISODateFormat } from './polyfills'

export function isISODate(value: string | unknown) {
	return day(`${value}`, ISODateFormat, true).isValid() || _.isDate(value);
}

/**
 *
 * @param value
 * @returns
 */
export default function toTyped(value: string | unknown) {
	if (validator.isNumeric(`${value}`)) return _.toNumber(value);
	if (isISODate(value)) return new Date(value as string);
	if (_.isArray(value)) return value.map((inner) => toTyped(inner));
	if (_.isObject(value)) {
		const entries = Object.entries(value);
		const normalized = entries.map(([key, value]) => [key, toTyped(value)]);

		return Object.fromEntries(normalized);
	}

	return value;
}
