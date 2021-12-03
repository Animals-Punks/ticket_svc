import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketController } from '@ticket/app/ticket.controller';
import { TicketService } from '@ticket/app/ticket.service';
import { TicketRepository } from '@ticket/infra/ticket.repository';
import { QueryHandlers } from '@ticket/domain/queries/handlers';
import { CaverJsModule } from '@shared/modules/caverJs/caverJs.module';

@Module({
    imports: [
        TicketRepository,
        CaverJsModule,
        CqrsModule,
        TypeOrmModule.forFeature([TicketRepository]),
    ],
    controllers: [TicketController],
    providers: [
        {
            provide: 'TicketService',
            useClass: TicketService,
        },
        ...QueryHandlers,
    ],
})
export class TicketModule {}
