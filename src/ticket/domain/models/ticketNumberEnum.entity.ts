import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import { Column, Entity, Index } from 'typeorm';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { TicketNumberEnumDto } from '@ticket/domain/dtos/ticketNumberEnum.dto';

@Index('ticket_number_enum_pkey', ['id'], { unique: true })
@Entity('ticket_number_enum', { schema: 'Ticket' })
export class TicketNumberEnum extends AbstractEntity<TicketNumberEnumDto> {
    @Column('int', { name: 'current_ticket_number' })
    currentTicketNumber: number;

    @Column('text', { name: 'type' })
    type: string;

    toDto() {
        return plainToClass(TicketNumberEnumDto, this);
    }

    public static generateUserId(): string {
        return uuidv4({ random: randomBytes(16) });
    }
}
