import { Module } from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { PlaylistController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { SongEntity } from 'src/songs/songs.entity';
import { UserEntity } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, SongEntity, UserEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
