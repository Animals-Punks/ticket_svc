import { Ticket } from '@ticket/domain/models/ticket.entity';

export interface SaveTicketInfoInput {
    ticketNumber: number;
    imageUrl: string;
    ticketType: string;
}

export interface ITicketRepository {
    findOneByTicketNumber(ticketNumber: number): Promise<Ticket>;
    saveTicketInfo(saveTicketInfoInput: SaveTicketInfoInput): Promise<Ticket>;
}
