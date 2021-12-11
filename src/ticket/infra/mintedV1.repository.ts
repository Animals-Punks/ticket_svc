import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { MintedApV1 } from '@src/ticket/domain/models/mintedApV1.entity';
import {
    GetGetApByApNumberInput,
    GetUsedApInput,
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

    async getGetApByApNumber(getGetApByApNumberInput: GetGetApByApNumberInput): Promise<MintedApV1> {
        const ap = await this.findOne({
            where: {
                apNumber:getGetApByApNumberInput.apNumber
            }
        })
        return ap;
    }

    async getUsedAp(getUsedApInput: GetUsedApInput): Promise<MintedApV1[]> {
        const usedAp = await this.find({
            where: {
                ticketId: getUsedApInput.ticketId,
            },
        });
        return usedAp;
    }
}
