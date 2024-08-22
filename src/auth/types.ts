export interface payloadTypes {
    email: string,
    userId: number,
    artistId?: number,
}

export type Enable2FAType = {
    secrete: string
}