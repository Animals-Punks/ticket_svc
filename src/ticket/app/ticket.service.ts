import { Injectable } from '@nestjs/common';

import { ITicketService } from '@ticket/domain/interfaces/ticket.interface';

@Injectable()
export class TicketService implements ITicketService {
    healthCheck(): string {
        return 'Server is Running 🚀';
    }
}
