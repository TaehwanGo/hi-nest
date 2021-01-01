import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // GET방식으로
    return request(app.getHttpServer()) // API request를 보냄
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()) // app.getHttpServer()는 우리 서버 url(http://localhost:3000) 을 의미함
        .get('/movies')
        .expect(200)
        .expect([]);
      // 보통 개발자는 2개의 DB를 사용함 : 배포용, 개발 테스트용
      // 테스팅 DB는 데이터를 생성, 삭제하는 일이 빈번하고 처음엔 [] 임(empty)
    });

    it('POST', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({
          title: 'Test',
          year: 2020,
          genres: ['test'],
        })
        .expect(201);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()) //404가 나오는 것 까지 테스트하는 것을 보여주고 싶었음
        .delete('/movies')
        .expect(404);
    });
  });
});
