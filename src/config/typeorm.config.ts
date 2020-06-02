import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'postgres',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: !!process.env.PG_SYNCHRONIZE || true
};
