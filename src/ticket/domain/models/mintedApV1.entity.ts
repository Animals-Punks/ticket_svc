import { plainToClass } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { MintedApV1Dto } from '@ticket/domain/dtos/mintedApV1.dto';

@Index('minted_ap_pkey', ['id'], { unique: true })
@Entity('minted_ap_v1', { schema: 'Ticket' })
export class MintedApV1 extends AbstractEntity<MintedApV1Dto> {
    @Column('text', { name: 'ticket_type', nullable: false })
    ticketType: string;

    @Column('text', { name: 'ap_number', nullable: false, unique: true })
    apNumber: string;

    @Column('uuid', { name: 'ticket_id', nullable: true, unique: false })
    ticketId: string;

    toDto() {
        return plainToClass(MintedApV1Dto, this);
    }
    public static generateUserId(): string {
        return uuidv4({ random: randomBytes(16) });
    }
}
