import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

describe('SongsController', () => {
  let controller: SongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        {
          provide: SongsService,
          useValue: {
            paginate: jest
              .fn()
              .mockResolvedValue(CreateSongDto)
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
      expect(songs).toEqual(CreateSongDto)
    })
  })
});
