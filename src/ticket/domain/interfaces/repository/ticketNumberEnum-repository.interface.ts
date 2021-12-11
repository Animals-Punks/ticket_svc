import { TicketNumberEnum } from '@ticket/domain/models/ticketNumberEnum.entity';

export interface UpdateTicketNumberByTypeInput {
    type: string;
    ticketNumber: number;
}

export interface ITicketNumberEnumRepository {
    findOneTicketNumberByType(type: string): Promise<TicketNumberEnum>;
    updateTicketNumberByType(
        updateTicketNumberByTypeInput: UpdateTicketNumberByTypeInput
    ): Promise<boolean>;
}
