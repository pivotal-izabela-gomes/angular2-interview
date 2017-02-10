import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let lists = [
      {id: 1, name: 'Grocery List', items: {
        id: 1, name: 'Bread'
      }}
    ];
    return {lists};
  }
}
