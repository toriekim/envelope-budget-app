export type ErrorWithCode = Error & { code?: string };

export interface NewEnvelope {
  title: string;
  budget: number;
}

export interface UpdateEnvelope {
  title?: string;
  budget?: number;
}

export interface Envelope {
  id: number;
  title: string;
  budget: number;
  createdAt: string;
  updatedAt: string;
}

export interface DataBase {
  envelopes: Envelope[];
}
