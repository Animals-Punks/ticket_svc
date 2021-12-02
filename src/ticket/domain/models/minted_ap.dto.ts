import { plainToClass } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { MintedApDto } from '@ticket/domain/dtos/minted_ap.dto';

@Index('minted_ap_pkey', ['id'], { unique: true })
@Entity('minted_ap')
export class MintedAp extends AbstractEntity<MintedApDto> {
    @Column('text', { name: 'ticket_type', nullable: false })
    ticketType: string;

    @Column('int', { name: 'ap_number', nullable: false, unique: true })
    apNumber: number;

    @Column('int', { name: 'ticket_number', nullable: false, unique: false })
    ticketNumber: number;

    toDto() {
        return plainToClass(MintedApDto, this);
    }
    public static generateUserId(): string {
        return uuidv4({ random: randomBytes(16) });
    }
}
