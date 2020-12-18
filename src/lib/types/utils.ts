export type Optional<T> = T | null;

export type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export enum SubmitStates {
    None,
    Processing,
    Success,
    Failure,
}
