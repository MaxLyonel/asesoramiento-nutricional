// framework nestjs
import { Global, Module } from "@nestjs/common";
// external dependencies
import { TypeOrmModule } from "@nestjs/typeorm";
// own implementations
import { DataSource } from "typeorm";
import { dataSource } from "./data-source";


@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource,
      autoLoadEntities: true
    })
  ],
  providers: [{
    provide: 'DATA_SOURCE',
    useFactory: async() => {
      const ds = new DataSource(dataSource)
      return ds.initialize()
    }
  }],
  exports: [TypeOrmModule, 'DATA_SOURCE']
})
export class DatabaseModule {}