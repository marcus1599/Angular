import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

export abstract class AbstractHttpService<T, I> {

  protected constructor(protected  httpClient: HttpClient) {
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.getApiUrl()}`);
  }

  save(record: T): Observable<T> {
    return this.httpClient.post<T>(this.getApiUrl(), record).pipe(take(1));
  }

  delete(id: I): Observable<any> {
    return this.httpClient.delete(`${this.getApiUrl()}/${id}`).pipe(take(1));
  }

  findById(id: I): Observable<T>{
    return this.httpClient.get<T>(`${this.getApiUrl()}/${id}`).pipe(take(1));
  }

 abstract getApiUrl(): string;

}