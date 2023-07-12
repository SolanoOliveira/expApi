export interface SeedsDB {
  inserts?: Array<{ model: string; query: string }>;
}

const seeds: Map<number, SeedsDB> = new Map<number, SeedsDB>();

seeds.set(1, {
  inserts: [
    {
      model: 'TipoUsuario',
      query: `INSERT INTO TipoUsuarios (id, rotulo, createdAt, updatedAt) values ('6a4cda94-fbb6-476b-be29-f4124cae9058', 'cliente', now(), now());`,
    },
    {
      model: 'TipoUsuario',
      query: `INSERT INTO TipoUsuarios (id, rotulo, createdAt, updatedAt) values ('7edd25c6-c89e-4c06-ae50-c3c32d71b8ad', 'admin', now(), now());`,
    },
  ],
});

export { seeds };
