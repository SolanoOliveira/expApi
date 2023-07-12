import express from 'express';
import router from './router';
import { api } from './api-info';
import { migracoes, MigracaoDB } from './db/migracoes';
import { seeds, SeedsDB } from './db/seeds';
import connection from './db/config';
import { VersaoDB } from './models/VersaoDB';
import { Usuario } from './models/Usuario';
import { TipoUsuario } from './models/TipoUsuario';
import { Produto } from './models/Produto';
import { Compra } from './models/Compra';
import { CompraItem } from './models/CompraItem';
import { error } from 'console';
import logger from './middlewares/logger';
import setLocals from './middlewares/setLocals';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

const models = [VersaoDB, Usuario, TipoUsuario, Produto, Compra, CompraItem];

declare module 'express-session' {
  interface SessionData {
    uid: string;
    tipoUsuarioId: string;
  }
}

export class Api {
  public server: express.Application;
  public publicPath: string;

  constructor() {
    this.server = express();
    this.publicPath = `${process.cwd()}/public`;
  }

  async bootstrap(): Promise<Api> {
    try {
      await this.middleware();
      await this.router();
      await this.initModels();
      await this.migrations();
      await this.seeds();
    } catch (err) {
      console.error(err);
    }

    return this;
  }

  private async middleware() {
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(setLocals);
    this.server.use(
      session({
        genid: () => uuidv4(),
        secret: 'LJHsadk5$3sdLas',
        resave: true,
        saveUninitialized: true,
      }),
    );
    this.server.use(logger('completo'));
  }

  private async router() {
    this.server.use(router);

    try {
      this.server.listen(api.defaultPort);
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  private async initModels() {
    await connection
      .authenticate()
      .then(async () => {
        console.info('MySQL DB Conectado!');
        await connection.addModels(models);
        await connection.sync();
      })
      .then(() => {
        console.info('DB sync!');
      })
      .catch((err) => {
        console.error(err);
        throw error;
      });
  }

  private async migrations() {
    const versaoDB = await VersaoDB.findByPk(api.db.id);
    const schemaVersaoAtualBanco = versaoDB == null ? 0 : versaoDB.schemaVersao;

    console.info(`VERSAO DO ESQUEMA DO BANCO: ${schemaVersaoAtualBanco}`);
    if (schemaVersaoAtualBanco < api.db.schemaVersion) {
      console.info(migracoes);
      const models: string[] = [];

      for (let i = schemaVersaoAtualBanco; i < api.db.schemaVersion; i++) {
        const migracao: MigracaoDB | undefined = migracoes.get(i + 1);

        if (migracao && migracao.consultas) {
          if (migracao.consultas !== null) {
            for (const consulta of migracao.consultas) {
              console.info('executando: ' + consulta.query);
              if (models.indexOf(consulta.model) < 0) {
                await connection.query(consulta.query);
                console.info('- executed!');
              } else {
                console.info('- not executed: new model.');
              }
            }
          }
        }
      }

      if (versaoDB == null) {
        await VersaoDB.create({
          id: api.db.id,
          schemaVersao: api.db.schemaVersion,
          seedVersao: api.db.seedVersion,
        });
      } else {
        versaoDB.schemaVersao = api.db.schemaVersion;
        await versaoDB.save();
      }
    }

    await connection
      .sync()
      .then(() => {
        console.info('Models sync!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private async seeds() {
    const versaoDB = await VersaoDB.findByPk(api.db.id);

    const seedVersaoAtualBanco = versaoDB == null ? 0 : versaoDB.seedVersao;

    console.info(`VERSAO DOS DADOS: ${seedVersaoAtualBanco}`);
    if (seedVersaoAtualBanco < api.db.seedVersion) {
      console.info(seeds);
      const models: string[] = [];

      for (let i = seedVersaoAtualBanco; i < api.db.seedVersion; i++) {
        const seed: SeedsDB | undefined = seeds.get(i + 1);

        if (seed && seed.inserts) {
          if (seed.inserts !== null) {
            for (const insert of seed.inserts) {
              console.info('executando: ' + insert.query);
              if (models.indexOf(insert.model) < 0) {
                await connection.query(insert.query);
                console.info('  executed!');
              } else {
                console.info('  not executed: new model.');
              }
            }
          }
        }
      }

      if (versaoDB == null) {
        await VersaoDB.create({
          id: api.db.id,
          schemaVersao: 0,
          seedVersao: api.db.seedVersion,
        });
      } else {
        versaoDB.seedVersao = api.db.seedVersion;
        await versaoDB.save();
      }
    }

    await connection
      .sync()
      .then(() => {
        console.info('Models sync!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
