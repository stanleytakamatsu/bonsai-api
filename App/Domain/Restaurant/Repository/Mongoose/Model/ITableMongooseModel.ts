import { Document } from 'mongoose';

import { ITableModel } from '../../Model/ITableModel';

type ITableMongooseModel = ITableModel & Document;

export { ITableMongooseModel };
