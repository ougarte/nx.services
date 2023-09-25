import { ViewEntity, ObjectLiteral, FindManyOptions } from 'typeorm';
import * as _ from 'lodash';
import { toSort } from '@helpers/mongo';
import { UserReport } from '@interfaces/enums';

/**
 *
 */
export class UserReportBuilder {
	/**
	 *
	 * @param report
	 * @param options
	 * @returns
	 */
	static create(report: UserReport, options: FindManyOptions) {
		const instance = new UserReportBuilder();

		switch(report) {
			case UserReport.Summary: return instance.summary(options);
			default: return [];
		}
	}

	/**
	 *
	 * @param pipeline
	 * @returns
	 */
	private toPipeline(pipeline: ObjectLiteral[]) {
		return pipeline.filter((pipe) => {
			const key = _.first(_.keys(pipe));

			return !_.isNull(pipe[key]) && !_.isUndefined(pipe[key]);
		});
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	private summary(options: FindManyOptions) : ObjectLiteral[] {
		const fields = { uuid: 1, username: 1, email: 1, firstName: 1, lastName: 1 };
		const pipeline = this.toPipeline([
			{ $match: options.where },
			{ $sort: toSort(options.order) },
			{ $project: fields },
			{ $skip: options.skip || 0 },
			{ $limit: options.take || Number.MAX_SAFE_INTEGER }
		]);

		return pipeline;
	}
}
