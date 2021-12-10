import { MintedApV2 } from '@ticket/domain/models/mintedApV2.entity';

export interface SaveUesdApInput {
    ticketType: string;
    apNumber: number;
    ticketId: string;
}

export interface GetUsedApInput {
    ticketId: string;
}

export interface IMintedApV2Repository {
    saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean>;
    getUsedAp(getUsedApInput: GetUsedApInput): Promise<MintedApV2[]>;
}
