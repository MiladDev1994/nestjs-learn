import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './songs.entity';
import { ArtistEntity } from '../artists/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity, ArtistEntity])],
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {}
