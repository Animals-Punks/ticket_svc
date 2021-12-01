import { Column, Entity, Index } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { TicketDto } from '@ticket/domain/dtos/ticket.dto';

@Index('ticket_pkey', ['id'], { unique: true })
@Entity('ticket')
export class Ticket extends AbstractEntity<TicketDto> {
    @Column('text', { name: 'ticket_name', unique: true, nullable: true })
    name: string;

    @Column('text', { name: 'ticket_url', unique: true, nullable: false })
    url: string;

    toDto() {
        return plainToClass(TicketDto, this);
    }

    public static generateUserId(): string {
        return uuidv4({ random: randomBytes(16) });
    }
}
