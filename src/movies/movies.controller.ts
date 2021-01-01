import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `we are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id') // '/:id'로 작성해도 되고 ':id'로 작성해도 됨
  getOne(@Param('id') movieId: string) {
    // movieId는 param을 가져오지만 이름 변경 가능
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    // req.body 의 데이터를 가져오려면
    console.log(movieData);
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      // json을 받아서 json으로 return
      updateMovie: movieId,
      ...updateData,
    };
  }
}
