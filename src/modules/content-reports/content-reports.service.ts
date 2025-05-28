import { Inject, Injectable } from '@nestjs/common';
import { ContentReports } from './schema/content-reports.schema';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';
import { Types } from 'mongoose';

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
}
