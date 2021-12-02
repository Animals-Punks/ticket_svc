import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketController } from '@ticket/app/ticket.controller';
import { TicketService } from '@ticket/app/ticket.service';
import { TicketRepository } from '@ticket/infra/ticket.repository';

@Module({
    imports: [
        TicketRepository,
        CqrsModule,
        TypeOrmModule.forFeature([TicketRepository]),
    ],
    controllers: [TicketController],
    providers: [
        {
            provide: 'TicketService',
            useClass: TicketService,
        },
    ],
})
export class TicketModule {}
