import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies; // 만약 실제 DB를 사용한다면 쿼리문이 여기에 작성될 것임
  }

  getOne(id: string): Movie {
    // console.log(this.movies.find((movie) => movie.id === +id)); // fake DB라서 저장하면 서버가 재시작될때 데이터들이 다 날라감
    return this.movies.find((movie) => movie.id === +id); // +id == parseInt(id)
  }

  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
