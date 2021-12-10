import { MintedApV1 } from '@ticket/domain/models/mintedApV1.entity';

export interface SaveUesdApInput {
    ticketType: string;
    apNumber: string;
    ticketId: string;
}

export interface GetUsedApInput {
    ticketId: string;
}

export interface IMintedApV1Repository {
    saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean>;
    getUsedAp(getUsedApInput: GetUsedApInput): Promise<MintedApV1[]>;
}
