import pg from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import { getEnv } from '../env/env';

export default class Database {
  db: any;
  connection: IConnectionParameters;
  pgp = pg();

  constructor() {
    getEnv(); //Important first get the environment variables to set the connection
    this.connection = {
      host: process.env.POSTGRES_HOST,
      port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5434,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      lock_timeout: 2500,
    };
    this.db = this.pgp(this.connection);
  }

  async executeSelectQuery(
    columns: string[],
    table: string,
    condition: string,
    subQuery?: string,
  ) {
    try {
      let query = `SELECT ${columns.join(',')} FROM ${table}`;
      if (subQuery) {
        query += ` WHERE ${condition} IN (${subQuery})`;
      } else {
        query += ` WHERE ${condition}`;
      }
      const result = await this.db.any(query);
      return result;
    } catch (error) {
      console.error('Error executing select query', error);
      throw error;
    }
  }

  async executeCountQuery(table: string, condition: string) {
    try {
      const query = `SELECT COUNT(*) FROM ${table} WHERE ${condition}`;
      const result = await this.db.one(query);
      return result.count;
    } catch (error) {
      console.error('Error executing count query', error);
      throw error;
    }
  }

  async executeUpdateQuery(
    table: string,
    updatedColumn: string,
    condition: string,
    subQuery?: string,
  ) {
    try {
      let query = `UPDATE ${table} SET ${updatedColumn}`;
      if (subQuery) {
        query += ` = (${subQuery}) WHERE ${condition}`;
      } else {
        query += ` WHERE ${condition}`;
      }
      await this.db.none(query);
    } catch (error) {
      console.error('Error executing update query', error);
      throw error;
    }
  }

  async executeDeleteQuery(
    table: string,
    condition: string,
    subQuery?: string,
  ) {
    try {
      let query = `DELETE FROM ${table}`;
      if (subQuery) {
        query += ` WHERE ${condition} = (${subQuery})`;
      } else {
        query += ` WHERE ${condition}`;
      }
      await this.db.none(query);
    } catch (error) {
      console.error('Error executing delete query', error);
      throw error;
    }
  }

  async wait(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async closeConnection(): Promise<void> {
    await this.pgp.end();
  }
}
