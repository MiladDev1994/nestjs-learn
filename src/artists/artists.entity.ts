import { SongEntity } from "../songs/songs.entity";
import { UserEntity } from "../users/users.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("artists")
export class ArtistEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToMany(() => SongEntity, (song) => song.artists)
    songs: SongEntity[]
}