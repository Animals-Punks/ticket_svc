import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { MintedApV2 } from '@src/ticket/domain/models/mintedApV2.entity';
import {
    GetUsedApInput,
    IMintedApV2Repository,
    SaveUesdApInput,
    GetGetApByApNumberInput,
} from '@ticket/domain/interfaces/repository/mintedV2-repository.interface';

@EntityRepository(MintedApV2)
export class MintedApV2Repository
    extends BaseRepository<MintedApV2>
    implements IMintedApV2Repository
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

    async getGetApByApNumber(getGetApByApNumberInput: GetGetApByApNumberInput): Promise<MintedApV2> {
        const ap = await this.findOne({
            where: {
                apNumber:getGetApByApNumberInput.apNumber
            }
        })
        return ap;
    }

    async getUsedAp(getUsedApInput: GetUsedApInput): Promise<MintedApV2[]> {
        const usedAp = await this.find({
            where: {
                ticketId: getUsedApInput.ticketId,
            },
        });
        return usedAp;
    }
}
