export interface MintTicketInput {
    mintAddress: string;
    property: string;
    imageUrl: string;
}

export interface ICaverJsService {
    getImageUrl(tokenId: number): Promise<string>;
    getMetaData(tokenId: number): Promise<any[]>;
    mintTicket(mintTicketInput: MintTicketInput): Promise<boolean>;
}
