import { faker } from "@faker-js/faker"
import * as bcrypt from "bcryptjs"
import { v4 as uuid4 } from "uuid"
import { UserEntity } from "src/users/users.entity"
import { PlaylistEntity } from "src/playlists/playlist.entity"
import { ArtistEntity } from "src/artists/artists.entity"
import { EntityManager } from "typeorm"

export const seedData = async (manager: EntityManager): Promise<void> => {

    await seedUser()
    await seedArtist()
    await seedPlaylists()

    async function seedUser () {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash("123456", salt);

        const user = new UserEntity();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4();

        await manager.getRepository(UserEntity).save(user);
    }

    async function seedArtist () {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash("123456", salt);

        const user = new UserEntity();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4();

        const artist = new ArtistEntity();
        artist.user = user;

        await manager.getRepository(UserEntity).save(user);
        await manager.getRepository(ArtistEntity).save(artist);
    }

    async function seedPlaylists () {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash("123456", salt);

        const user = new UserEntity();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4();

        const playlist = new PlaylistEntity();
        playlist.name = faker.music.genre();
        playlist.user = user;

        await manager.getRepository(UserEntity).save(user);
        await manager.getRepository(PlaylistEntity).save(playlist);
    }
}