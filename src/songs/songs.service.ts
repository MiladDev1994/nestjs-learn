import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SongEntity } from './songs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ArtistEntity } from '../artists/artists.entity';

@Injectable({
    // scope: Scope.TRANSIENT
})
export class SongsService {

    // private readonly songs = []
    constructor(
        @InjectRepository(SongEntity)
        private songsRepository: Repository<SongEntity>,
        @InjectRepository(ArtistEntity)
        private artistsRepository: Repository<ArtistEntity>
    ){}

    async create (songDTO: CreateSongDto): Promise<SongEntity> {
        const song = new SongEntity()
        song.title = songDTO.title
        song.artists = songDTO.artists
        song.duration = songDTO.duration
        song.lyrics = songDTO.lyrics
        song.releasedDate = songDTO.releasedDate

        
        // for ManyToMany
        const artists = await this.artistsRepository.findByIds(song.artists)
        song.artists = artists
        
        return await this.songsRepository.save(song)
    }

    findAll(): Promise<SongEntity[]> {
        return this.songsRepository.find()
    }

    findOne(id: number): Promise<SongEntity> {
        return this.songsRepository.findOneBy({id})
    }

    delete(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete(id)
    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songsRepository.update(id, recordToUpdate)
    }

    async paginate(option: IPaginationOptions): Promise<Pagination<SongEntity>> {
        const queryBuilder = this.songsRepository.createQueryBuilder("c")
        queryBuilder.orderBy("c.releasedDate", "DESC")
        return paginate<SongEntity>(queryBuilder, option)
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // برای تست اولیه

    // create(song) {
    //     this.songs.push(song)
    //     console.log(this.songs);
    //     return this.songs
    // }

    // findAll(): Promise<SongEntity[]> {
    //     // throw new Error("Error trowed")
    //     return this.songsRepository.find()
    // }
}
