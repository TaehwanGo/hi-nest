import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Req,
  // Res,
  // Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {
    // 따로 객체를 생성하지 않고 MoviesService를 파라미터로 전달만 했는데
    // 클래스 안에서 (static method처럼)사용이 가능한 이유는 module에서 import해서 조합해주기 때문
    // 이것이 dependency injection
    // 그래서 service파일에 보면 @injectable() 데코레이터가 붙는 이유가 바로 이것 임
  }

  @Get()
  getAll(): Movie[] {
    // getAll(@Req() req, @Res() res) 와 같이 req와 res로 express의 req, res에 직접 접근도 가능하다
    // 하지만 NestJS는 express와 festify 모두 호환이 가능하므로 위 방법은 좋지 않다.
    // 그래도 필요하다면 위같은 방법으로 접근할 수 있다는 것은 알고 있자.
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `we are searching for a movie made after: ${searchingYear}`;
  // }

  @Get('/:id') // '/:id'로 작성해도 되고 ':id'로 작성해도 됨
  getOne(@Param('id') movieId: number): Movie {
    console.log(typeof movieId);
    // movieId는 param을 가져오지만 이름 변경 가능
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    // req.body 의 데이터를 가져오려면
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(movieId, updateData);
  }
}
