import { DataSource, DataSourceOptions } from "typeorm";


export const dataSourceOption: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "5913",
    database: "nest_doc",
    // entities: [SongEntity, UserEntity, ArtistEntity],
    entities: ["dist/**/*.entity.js"],
    synchronize: false,
    migrations: ["dist/db/migrations/*.js"]
}

const dataSource = new DataSource(dataSourceOption)
export default dataSource
