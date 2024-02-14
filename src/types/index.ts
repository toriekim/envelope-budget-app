export interface NewEnvelope {
  title: string;
  budget: number;
}

export interface EnvelopeToInsert {
  title: string;
  budget: number;
  createdAt: string;
  updatedAt: string;
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
