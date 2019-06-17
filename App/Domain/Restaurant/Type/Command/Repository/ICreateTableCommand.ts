import { Table } from '../../../Entity/Table';

interface ICreateTableCommand {
  Table: Table;
}

const ICreateTableCommand = Symbol.for('ICreateTableCommand');

export { ICreateTableCommand };
