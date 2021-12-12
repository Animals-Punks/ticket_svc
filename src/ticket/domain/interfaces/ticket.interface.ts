export interface GetTicketInfoParmas {
    ticketNumber: number;
    ticketType: string;
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
    ticketNumber: number;
    usedAps: any[];
}

export interface ITicketService {
    healthCheck(): string;
    getTicketInfo(
        getTicketInfoParmas: GetTicketInfoParmas
    ): Promise<GetTicketInfoReturn>;
    mintTicket(mintTicketParams: MintTicketParams): Promise<{ minted: number }>;
}
