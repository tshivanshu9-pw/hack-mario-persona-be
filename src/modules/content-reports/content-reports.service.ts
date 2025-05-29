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

    async getGenerationTrends(days: number = 7): Promise<{ date: string, count: number }[]> {
        const since = new Date();
        since.setDate(since.getDate() - days + 1);

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

        return this.contentReportsRepo.aggregate(pipeline).then(results =>
            results.map(r => ({ date: r._id, count: r.count }))
        );
    }

    async getTotalGeneratedContents(): Promise<number> {
        return this.contentReportsRepo.count({});
    }
}
