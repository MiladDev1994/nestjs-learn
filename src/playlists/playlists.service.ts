import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { Repository } from 'typeorm';
import { SongEntity } from 'src/songs/songs.entity';
import { UserEntity } from 'src/users/users.entity';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {

    constructor(
        @InjectRepository(PlaylistEntity)
        private playlistRepo: Repository<PlaylistEntity>,
    
        @InjectRepository(SongEntity)
        private songRepo: Repository<SongEntity>,
    
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
    ) {}

    async create(playlistDto: CreatePlaylistDTO): Promise<PlaylistEntity> {
        const playlist = new PlaylistEntity()
        playlist.name = playlistDto.name;

        const songs = await this.songRepo.findByIds(playlistDto.songs)
        playlist.songs = songs;

        const user = await this.userRepo.findOneBy({ id: playlistDto.user })
        playlist.user = user;

        return this.playlistRepo.save(playlist)
    }
}
