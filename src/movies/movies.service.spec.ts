import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  // beforeEach 처럼 afterEach, beforeAll, afterAll 등 많은 Hook이 존재 함
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

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      // 처음엔 data가 없으므로 test data를 넣어줌
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });
      // console.log(service.getAll());
      // const allMovies = service.getAll();
      const beforDelete = service.getAll().length; // allMovies
      service.deleteOne(1);
      // const afterDelete = service.getAll();
      const afterDelete = service.getAll().length;
      // expect(afterDelete.length).toEqual(allMovies.length - 1);
      expect(afterDelete).toBeLessThan(beforDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });
      // 여러가지 테스트를 해볼 수 있음
      // 얼만큼의 movie가 늘어났는지
      // 마지막에 생성된 movie의 title이 일치하는지
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
