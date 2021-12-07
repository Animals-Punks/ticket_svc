import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { MintedApV1 } from '@ticket/domain/models/mintedApV1.dto';
import {
    IMintedApV1Repository,
    SaveUesdApInput,
} from '../domain/interfaces/repository/mintedV1-repository.interface';

@EntityRepository(MintedApV1)
export class MintedApV1Repository
    extends BaseRepository<MintedApV1>
    implements IMintedApV1Repository
{
    async saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean> {
        try {
            await this.save({ ...saveUesdApInput });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
