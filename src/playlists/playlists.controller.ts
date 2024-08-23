import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { PlaylistEntity } from './playlist.entity';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';

@Controller('playlist')
export class PlaylistController {
    constructor(
        private playlistService: PlaylistService
    ) {}

    @Post()
    create(
        @Body()
        playlistDTO: CreatePlaylistDTO
    ): Promise<PlaylistEntity> {
        return this.playlistService.create(playlistDTO)
    }
}
