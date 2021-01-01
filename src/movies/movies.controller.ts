import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `we are searching for a movie made after: ${searchingYear}`;
  // }

  @Get('/:id') // '/:id'로 작성해도 되고 ':id'로 작성해도 됨
  getOne(@Param('id') movieId: string): Movie {
    // movieId는 param을 가져오지만 이름 변경 가능
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    // req.body 의 데이터를 가져오려면
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
