import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDTO {
  // movie를 만들기 위해 필요한 것들을 나열
  // DB의 id는 포함되면 안되므로 검사를 위한 DTO 클래스를 만들어서 타입을 부여함
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true }) // IsString을 ctrl 클릭해서 들어가면 array 하나하나 검사하는 옵션 부여
  readonly genres: string[];
}
