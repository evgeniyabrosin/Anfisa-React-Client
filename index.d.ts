
export interface DsDistItem {
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
        [key: string]: DsDistItem;
    }

export interface Documentation {
        id: string;
        title: string;
        url: string;
    }

export interface DirInfoI {
        version: string;
        'ds-list': string[];
        'ds-dict': DsDist;
        documentation: Documentation[];
    }

export type DirInfoType = DirInfoI | Record<string, unknown>
