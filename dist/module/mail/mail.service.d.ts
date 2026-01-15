import type { Queue } from 'bull';
export interface StudentActivationPayload {
    to: string;
    studentId: string;
    tempPassword: string;
    activationLink: string;
    institutionName: string;
}
export declare class MailService {
    private emailQueue;
    private transporter;
    constructor(emailQueue: Queue);
    sendMail(options: {
        to: string;
        subject: string;
        html: string;
        from?: string;
    }): Promise<void>;
}
