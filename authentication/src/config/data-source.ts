import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { Account } from 'src/entity/account';
import { Profile, Role } from 'src/entity';
import { RefreshToken } from 'src/entity/token';

config({ path: join(process.cwd(), '.env') });

console.log(process.env.DATABASE_HOST);

export const postgresOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  // keepConnectionAlive: true,
  // logging: process.env.NODE_ENV !== 'production',
  entities: [Account, Profile, Role, RefreshToken], // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

console.log(postgresOptions);

export const dataSource = new DataSource(postgresOptions);
export default dataSource;
