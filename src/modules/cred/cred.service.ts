import { Inject, Injectable } from '@nestjs/common';
import { Cred } from './schema/cred.schema';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';

@Injectable()
export class CredService {
     constructor(
            @Inject(Cred.name)
            private credRepo: BaseRepository<Cred>,
        ) { }

        async fetchOne(Params){
            return this.credRepo.fetchOne(Params);
        }
}
