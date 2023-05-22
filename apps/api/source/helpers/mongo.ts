import { FindOptionsOrder } from 'typeorm';
import * as _ from 'lodash';
import toTyped, { isISODate } from '@helpers/to.typed';

const tokens = {
	eq: '$eq',
	gt: '$gt',
	gte: '$gte',
	lt: '$lt',
	lte: '$lte',
	in: '$in',
}

function toCriteria(value) {
	if (_.isNumber(value) || _.isString(value) || isISODate(value)) {
		return { $eq: toTyped(value) };
	} else if (_.isArray(value)) {
		return { $in: value };
	} else if (_.isObject(value)) {
		const keys = _.keys(value);
		const result = keys.reduce((accumulator, key) => {
			const token = tokens[key];
			let tokenValue = value[key];

			if (!token) throw new Error(`Invalid query. Then filter token ${key} does not exist.`);
			if (token === '$in' && _.isString(tokenValue)) {
				tokenValue = toTyped(`${tokenValue}`.split(','));
			}

			return { ...accumulator, [token]: tokenValue};
		}, {});

		return result;
	}

	return;
}

/**
 *
 * @param sort
 * @returns
 */
export function toOrder<TEntity>(sort: any): FindOptionsOrder<TEntity> {
	let order = sort;

	if (_.isArray(sort)) {
		order = sort.reduce((accumulator, item) => {
			return { ...accumulator, ...item };
		}, {});
	}

	return order;
}

export function toSort(sort: any) {
	if (!sort) return null;

	const result = _.keys(sort).reduce((accumulator, property) => {
		const value = /^asc$/gi.test(sort[property]) ? 1 : -1;

		return { ...accumulator, [property]: value };
	}, {});

	return _.isEmpty(result) ? null : result;
}

/**
 *
 * @param filter
 * @example
 * filter: { <property>: <value> } => { <property>: { $eq: <value> } }
 * filter: { <property>: { <token>: <value> } } => { <property>: { <operator>: <value> } }
 * @returns
 */
export function toWhere(filter?: unknown) {
	const result = _.keys(filter).reduce((accumulator, property) => {
		const value = filter[property];

		accumulator[property] = toCriteria(value);

		return accumulator;
	}, {});

	return _.isEmpty(result) ? null : result;
}
