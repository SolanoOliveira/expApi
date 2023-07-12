export interface MigracaoDB {
  consultas?: Array<{ model: string; query: string }>;
}

const migracoes: Map<number, MigracaoDB> = new Map<number, MigracaoDB>();

migracoes.set(1, {
  consultas: [
    {
      model: 'TipoUsuario',
      query: `ALTER TABLE TipoUsuario ADD atributo_adicionado VARCHAR(45);`,
    },
  ],
});

migracoes.set(2, {
  consultas: [
    {
      model: 'TipoUsuario',
      query: `ALTER TABLE TipoUsuario ADD atributo_adicionado_2 VARCHAR(45) NOT NULL DEFAULT "";`,
    },
  ],
});

export { migracoes };
