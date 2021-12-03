export interface GetTicketInfoParmas {
    ticketNumber: number;
}

export interface GetTicketInfoReturn {
    name: string;
    image: string;
    attributes: any[];
}

export interface ITicketService {
    healthCheck(): string;
    getTicketInfo(getTicketInfoParmas: GetTicketInfoParmas): Promise<GetTicketInfoReturn>;
}
