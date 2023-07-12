import dotenv from 'dotenv';
dotenv.config();

export const api = {
  name: 'API-EMPRESA',
  defaultPort: process.env.PORT ?? 3333,
  db: {
    id: '043577f0-0b22-11ee-be56-0242ac120002',
    schemaVersion: 0,
    seedVersion: 1,
  },
};
