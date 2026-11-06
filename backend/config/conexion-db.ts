import { Pool } from 'pg';
import { configurarPool } from './pool-config';

const conexionDB = new Pool(configurarPool(process.env));

export default conexionDB;
