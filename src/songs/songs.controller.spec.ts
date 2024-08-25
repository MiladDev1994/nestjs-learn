import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';

describe('SongsController', () => {
  let controller: SongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        {
          provide: SongsService,
          useValue: {
            paginate: jest.fn().mockResolvedValue([CreateSongDto]),
            findOne: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({ id }) 
            }),
            // create: jest.fn().mockImplementation((createSongDTO: CreateSongDto) => {
            //   return Promise.resolve({ id: "a uuid", ...createSongDTO })
            // }),
            // update: jest.fn().mockImplementation((updateSongDTO: UpdateSongDto) => {
            //   return Promise.resolve({ affected: 1 })
            // }),
            // delete: jest.fn().mockImplementation((id: string) => {
            //   return Promise.resolve({ affected: 1 })
            // })
          }
        }
      ]
    }).compile();

    controller = module.get<SongsController>(SongsController); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should fetch all the songs", async () => {
      const songs = await controller.findAll()
      expect(songs).toEqual([CreateSongDto])
    })
  })

  describe("findOne", () => {
    it("should fetch one the songs", async () => {
      const songs = await controller.findOne(1)
      expect(songs.id).toBe(1)
    })
  })

  describe("create", () => {
    it("should create a new song", async () => {
      const newSongDto = {
        title: "new song",
        artists: [1, 2],
        releasedDate: "1994-08-05",
        duration: "23:59",
        lyrics: "lyrics"
    }
      const songs = await controller.create(newSongDto, {})
      expect(songs.title).toBe("new song")
    })
  })
});
