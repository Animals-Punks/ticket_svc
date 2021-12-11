import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { TicketNumberEnum } from '@ticket/domain/models/ticketNumberEnum.entity';
import {
    ITicketNumberEnumRepository,
    UpdateTicketNumberByTypeInput,
} from '@ticket/domain/interfaces/repository/ticketNumberEnum-repository.interface';

@EntityRepository(TicketNumberEnum)
export class TicketNumberEnumRepository
    extends BaseRepository<TicketNumberEnum>
    implements ITicketNumberEnumRepository
{
    async findOneTicketNumberByType(type: string): Promise<TicketNumberEnum> {
        const ticketNumberEnum = await this.findOne({
            where: {
                type: type,
            },
        });

        return ticketNumberEnum;
    }

    async updateTicketNumberByType(
        updateTicketNumberByTypeInput: UpdateTicketNumberByTypeInput
    ): Promise<boolean> {
        try {
            const ticketNumberEnum = await this.findOne({
                where: {
                    type: updateTicketNumberByTypeInput.type,
                },
            });

            const updateTicketNumberEnumData = {
                id: ticketNumberEnum.id,
                type: ticketNumberEnum.type,
                currentTicketNumber: updateTicketNumberByTypeInput.ticketNumber,
            };

            const updateResult = await this.save({
                ...updateTicketNumberEnumData,
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
