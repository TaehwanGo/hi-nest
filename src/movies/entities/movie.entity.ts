export class Movie {
  // typescript는 이렇게 constructor나 함수 안에서 변수를 this.id 같이 선언하지 않고 선언이 가능하구나
  // eslint의 CRLF방식을 LF방식으로 변경(줄바꿈 방식)
  id: number;
  title: string;
  year: number;
  genres: string[];
}

// {
// 	"title": "tony",
// 	"year": 2020,
// 	"genres": ["typescript", "nestJS"]
// }
