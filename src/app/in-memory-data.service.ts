import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let lists = [
      {id: 1, name: 'Grocery List'}
    ];
    let items = [{id: 1, name: 'Bread', listId: 1}]
    return {lists, items};
  }
}
