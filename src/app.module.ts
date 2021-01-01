import { Module } from '@nestjs/common';
// import { MoviesController } from './movies/movies.controller';
// import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller'; // app dir안에 있던 controller.st를 꺼내고 dir삭제함

@Module({
  imports: [MoviesModule],
  controllers: [AppController], // MoviesController
  providers: [], // MoviesService
})
export class AppModule {}
