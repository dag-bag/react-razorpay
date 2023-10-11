export interface Ticket {
    _id: string,
    isExpired: boolean,
    generatorId: string
}

export interface Response {
    generatorId: string
    ticketQuantity: number,
    paymentConfirmationStatus: "confirmed" | "cancelled",
}
