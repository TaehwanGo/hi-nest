import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies; // 만약 실제 DB를 사용한다면 쿼리문이 여기에 작성될 것임
  }

  getOne(id: number): Movie {
    // console.log(id);
    // console.log('service getOne, id type:', typeof id);
    // console.log(this.movies.find((movie) => movie.id === +id)); // fake DB라서 저장하면 서버가 재시작될때 데이터들이 다 날라감
    const movie = this.movies.find((movie) => movie.id === id); // +id == parseInt(id)
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found.`); // nest js에서 제공하는 기능 : Error -> ... -> NotFoundException
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id); // id 에러 확인 용
    this.deleteOne(id);
    console.log({ ...movie });
    console.log({ ...movie, ...updateData });
    this.movies.push({ ...movie, ...updateData });
  }
}
