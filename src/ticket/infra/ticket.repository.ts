import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { Ticket } from '@ticket/domain/models/ticket.entity';
import { ITicketRepository } from '@ticket/domain/interfaces/repository/ticket-repository.interface';

@EntityRepository(Ticket)
export class TicketRepository
    extends BaseRepository<Ticket>
    implements ITicketRepository {}
