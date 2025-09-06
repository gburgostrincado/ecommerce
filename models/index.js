import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';

const dbConfig = config[process.env.NODE_ENV || 'development']

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};
let sequelize;

if (dbConfig.databaseUrl) {
  sequelize = new Sequelize(dbConfig.databaseUrl, {
    dialect: 'postgres',
    logging: false
  });
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

const modelFiles = fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')

for (const file of modelFiles) {
  const modelPath = path.join(__dirname, file);
  const { default: modelDef } = await import(pathToFileURL(modelPath).href);
  const model = modelDef(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;