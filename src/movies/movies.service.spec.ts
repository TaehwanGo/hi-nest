import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      // getOne은 create된 것이 없으면 문제가 생길 수 있으므로 하나 생성
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999); // id에 맞는 데이터가 없으면 throw new NotFoundException 에 의해 에러를 던짐
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        // expect(error.message).toEqual('Movie with ID: 999 not found.');
      }
    });
  });
});
