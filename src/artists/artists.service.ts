import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(ArtistEntity)
        private artistRepo: Repository<ArtistEntity>
    ) {}

    findArtList(userId: number): Promise<ArtistEntity> {
        return this.artistRepo.findOneBy({user: {id: userId}})
    }
}
