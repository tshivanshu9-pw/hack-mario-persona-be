import { Inject, Injectable } from '@nestjs/common';
import { ContentReports } from './schema/content-reports.schema';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';
import { Types } from 'mongoose';
import { PipelineStage } from 'mongoose';

@Injectable()
export class ContentReportsService {
    constructor(
        @Inject(ContentReports.name)
        private contentReportsRepo: BaseRepository<ContentReports>,
    ) { }

    async create(data: ContentReports): Promise<ContentReports> {
        return this.contentReportsRepo.create(data);
    }

    async update(id: Types.ObjectId, data: Partial<ContentReports>): Promise<ContentReports> {
        return this.contentReportsRepo.findOneAndUpdate({_id: id}, data);
    }

    async getGenerationTrends(days: number = 7): Promise<{ date: string, count: number, deltaPercent?: number }[]> {
        const since = new Date();
        since.setHours(0, 0, 0, 0);
        since.setDate(since.getDate() - (days - 1));

        const pipeline: PipelineStage[] = [
            { $match: { updatedAt: { $gte: since } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ];

        const results = await this.contentReportsRepo.aggregate(pipeline);
        const trends = results.map(r => ({ date: r._id, count: r.count }));

        for (let i = 1; i < trends.length; i++) {
            const prev = trends[i - 1].count;
            const curr = trends[i].count;
            trends[i].deltaPercent = prev === 0 ? null : Number((((curr - prev) / prev) * 100).toFixed(2));
        }
        if (trends.length > 0) {
            trends[0].deltaPercent = 0;
        }

        return trends;
    }

    async getTotalGeneratedContents(): Promise<number> {
        return this.contentReportsRepo.count({});
    }
}
