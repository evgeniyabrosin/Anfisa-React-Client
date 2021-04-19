
export interface PGP3140HLGENES {
        name: string;
        'upd-time': Date;
        kind: string;
        note: string;
        doc: any[][][];
        total: number;
        'date-note'?: any;
        ancestors: any[];
        'v-level': number;
        'v-idx': number;
        'v-idx-to': number;
    }

export interface DsDict {
        PGP3140_HL_GENES: PGP3140HLGENES;
    }

export interface Documentation {
        id: string;
        title: string;
        url: string;
    }

export interface DirInfoI {
        version: string;
        'ds-list': string[];
        'ds-dict': DsDict;
        documentation: Documentation[];
    }

export type DirInfoType = DirInfoI | Record<string, unknown>
