import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from 'src/app/reducers/api.service';
import { TypeActionTypes, TypesLoaded } from './type.actions';
import { map, mergeMap } from 'rxjs/operators';


@Injectable()
export class TypeEffects {
  @Effect()
  public load$ = this.actions$
    .ofType(TypeActionTypes.LoadTypes)
    .pipe(
      mergeMap(() =>
        this.api
          .getMissionTypes$()
          .pipe(map(types => new TypesLoaded(types)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
