
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
export type DsDistItemType = DsDistItem | Record<string, unknown>


export interface NA24143 {
        affected: boolean;
        family: string;
        father: string;
        id: string;
        mother: string;
        name: string;
        sex: number;
    }

export interface NA24149 {
        affected: boolean;
        family: string;
        father: string;
        id: string;
        mother: string;
        name: string;
        sex: number;
    }

export interface NA24385 {
        affected: boolean;
        family: string;
        father: string;
        id: string;
        mother: string;
        name: string;
        sex: number;
    }

export interface Samples {
        NA24143: NA24143;
        NA24149: NA24149;
        NA24385: NA24385;
    }

export interface Versions {
        'Anfisa load': string;
        GERP: string;
        annotations: string;
        annotations_build: string;
        annotations_date: string;
        bcftools_annotate_version: string;
        gatk: string;
        gatk_select_variants: string;
        pipeline: string;
        reference: string;
        vep_version: string;
    }

export interface Meta {
        case: string;
        cohorts: any[];
        data_schema: string;
        modes: string[];
        proband: string;
        record_type: string;
        samples: Samples;
        versions: Versions;
    }

export interface DsinfoI {
        name: string;
        'upd-time'?: any;
        kind: string;
        note: string;
        doc: string[][][];
        total: number;
        'date-note'?: any;
        ancestors: any[];
        meta: Meta;
        cohorts: any[];
        'unit-groups': any[][];
    }

export type DsInfoType = DsinfoI | Record<string, unknown>