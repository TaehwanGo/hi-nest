import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // beforeEach에서 beforeAll로 바꿈 : 새로 test할때마다 DB가 텅텅비어 있기 때문
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      // main.ts에 있는 실제 app에 적용한 미들웨어들을 test용 app에도 적용시켜줘야 함
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // url의 :id값이 string이지만 transform을 통해 number로 변환가능
      }),
    );
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

    it('POST 201', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({
          title: 'Test',
          year: 2020,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({
          title: 'Test',
          year: 2020,
          genres: ['test'],
          other: 'thing', // forbidNonWhitelisted가 true 이기 때문에 400을 리턴함
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()) //404가 나오는 것 까지 테스트하는 것을 보여주고 싶었음
        .delete('/movies')
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()) //
        .get('/movies/1') // 위에서 POST요청을 테스트할때 하나 생성된것을 알기 때문에 id를 1로 접근함
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()) //
        .get('/movies/1234') // 위에서 POST요청을 테스트할때 하나 생성된것을 알기 때문에 id를 1로 접근함
        .expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer()) //
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()) //
        .delete('/movies/1')
        .expect(200);
    });
  });
});
