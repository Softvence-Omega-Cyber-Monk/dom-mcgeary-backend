export declare class CreateMailDto {
}
export declare class SubscribeDto {
    email: string;
}
export interface SendMailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html: string;
    from?: string;
}
