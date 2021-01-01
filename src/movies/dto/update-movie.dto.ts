// import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'; // npm i @nestjs/mapped-types
import { CreateMovieDTO } from './create-movie.dto';
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
  // PartialType은 base type을 필요로 함
  // CreateMovieDTO의 일부만 수정 할 수 있게 함
}
