import { Ticket } from '@ticket/domain/models/ticket.entity';

export interface SaveTicketInfoInput {
    ticketNumber: number;
    imageUrl: string;
    ticketType: string;
}

export interface ITicketRepository {
    findOneByTicketNumber(ticketNumber: number, type: string): Promise<Ticket>;
    saveTicketInfo(saveTicketInfoInput: SaveTicketInfoInput): Promise<Ticket>;
}
