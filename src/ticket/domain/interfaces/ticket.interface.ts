export interface GetTicketInfoParmas {
    ticketNumber: number;
}

export interface GetTicketInfoReturn {
    name: string;
    image: string;
    attributes: any[];
}

export interface MintTicketParams {
    ticketType: string;
    address: string;
    imageUrl: string;
    usedAps: any[];
}

export interface ITicketService {
    healthCheck(): string;
    getTicketInfo(
        getTicketInfoParmas: GetTicketInfoParmas
    ): Promise<GetTicketInfoReturn>;
    mintTicket(
        mintTicketParams: MintTicketParams
    ): Promise<{ minted: boolean }>;
}
