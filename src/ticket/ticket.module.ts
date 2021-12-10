import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketController } from '@ticket/app/ticket.controller';
import { TicketService } from '@ticket/app/ticket.service';
import { TicketRepository } from '@ticket/infra/ticket.repository';
import { QueryHandlers } from '@ticket/domain/queries/handlers';
import { CommandHandlers } from '@ticket/domain/commands/handlers';
import { CaverJsModule } from '@shared/modules/caverJs/caverJs.module';
import { MintedApV1Repository } from '@ticket/infra/mintedV1.repository';
import { MintedApV2Repository } from '@ticket/infra/mintedV2.repository';

@Module({
    imports: [
        TicketRepository,
        MintedApV1Repository,
        MintedApV2Repository,
        CaverJsModule,
        CqrsModule,
        TypeOrmModule.forFeature([
            TicketRepository,
            MintedApV1Repository,
            MintedApV2Repository,
        ]),
    ],
    controllers: [TicketController],
    providers: [
        {
            provide: 'TicketService',
            useClass: TicketService,
        },
        ...QueryHandlers,
        ...CommandHandlers,
    ],
})
export class TicketModule {}
