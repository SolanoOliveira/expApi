import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: '',
  password: '',
  database: '',
  logging: false,
});

export default connection;
