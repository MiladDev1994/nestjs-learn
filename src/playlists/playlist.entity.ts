import { SongEntity } from "src/songs/songs.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("playlists")
export class PlaylistEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => SongEntity, (song) => song.playlists)
    songs: SongEntity[]

    @ManyToOne(() => UserEntity, (user) => user.playlists)
    user: UserEntity
}
