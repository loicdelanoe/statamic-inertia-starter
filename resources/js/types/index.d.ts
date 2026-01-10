export type Field = {
    type: string;
    display: string;
    validate: string[];
    handle: string;
    width: number;
    instructions?: string;
    instructions_position?: string;
};

export type FormErrors = Record<string, string>;

export interface Form {
    handle: string;
    title: string;
    fields: Field[];
    honeypot: string;
}
