import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { Ticket } from '@ticket/domain/models/ticket.entity';
import {
    ITicketRepository,
    SaveTicketInfoInput,
} from '@ticket/domain/interfaces/repository/ticket-repository.interface';

@EntityRepository(Ticket)
export class TicketRepository
    extends BaseRepository<Ticket>
    implements ITicketRepository
{
    async findOneByTicketNumber(
        ticketNumber: number,
        type: string
    ): Promise<Ticket> {
        const ticket = await this.findOne({
            where: {
                ticketNumber: ticketNumber,
                ticketType: type,
            },
        });
        return ticket;
    }

    async saveTicketInfo(
        saveTicketInfoInput: SaveTicketInfoInput
    ): Promise<Ticket> {
        const ticket = await this.save({ ...saveTicketInfoInput });
        return ticket;
    }
}
