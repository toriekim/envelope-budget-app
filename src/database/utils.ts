import fs from 'fs';
import { DataBase } from '../types';

export const saveToDatabase = (DB: DataBase) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), {
    encoding: 'utf-8',
  });
};

export const createId = (DB: DataBase) => {
  const lastRecord = DB.envelopes[DB.envelopes.length - 1];
  const newId = lastRecord.id + 1;
  if (Number.isNaN(newId) || newId < 0 || newId === undefined) {
    console.error('Invalid ID');
  }
  return newId;
};

export const getIdxById = (DB: DataBase, id: number) => {
  const recordIdx = DB.envelopes.findIndex((envelope) => envelope.id === id);
  return recordIdx;
};
