export interface ListaOptions {
    id?: string;
    name?: string;
    description?: string;
    quantity?: string;
}

export class Lista implements ListaOptions{
    name?: string;
    id?: string;
    description?: string;
    quantity?: string;

    constructor (data: ListaOptions = {}) {
        this.name = data.name || '';
        this.id = data.id || '';
        this.description = data.description || '';
        this.quantity = data.quantity || '';
    }
}