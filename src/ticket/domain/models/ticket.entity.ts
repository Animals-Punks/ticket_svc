import { Column, Entity, Index } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { TicketDto } from '@ticket/domain/dtos/ticket.dto';

@Index('ticket_pkey', ['id'], { unique: true })
@Entity('ticket', { schema: 'Ticket' })
export class Ticket extends AbstractEntity<TicketDto> {
    @Column('int', { name: 'ticket_number', unique: false, nullable: false })
    ticketNumber: number;

    @Column('text', { name: 'image_url', unique: false, nullable: false })
    imageUrl: string;

    @Column('text', { name: 'ticket_type', unique: false, nullable: false })
    ticketType: string;

    toDto() {
        return plainToClass(TicketDto, this);
    }

    public static generateUserId(): string {
        return uuidv4({ random: randomBytes(16) });
    }
}
