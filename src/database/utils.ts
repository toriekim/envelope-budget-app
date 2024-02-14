import fs from 'fs';
import { DataBase } from '../types';

export const saveToDatabase = (DB: DataBase) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), {
    encoding: 'utf-8',
  });
};
