import { ArtistEntity } from "../artists/artists.entity";
import { PlaylistEntity } from "../playlists/playlist.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("songs")
export class SongEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column("varchar", {array: true})
    // artists: string[]

    @Column("date")
    releasedDate: Date;

    @Column("time")
    duration: Date;

    @Column("text")
    lyrics: string

    @ManyToMany(() => ArtistEntity, (artist) => artist.songs, {cascade: true}) // از cascade برای ایجاد ارتباط پویا بین جداول استفاده میشه. یعنی به تغییرات حساس میشه و به صورت خودکار اعمال میکنمه
    @JoinTable({name: "songs_artists"})
    artists: ArtistEntity[]

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs)
    playlists: PlaylistEntity
}