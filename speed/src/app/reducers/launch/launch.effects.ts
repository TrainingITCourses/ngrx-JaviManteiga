import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from 'src/app/reducers/api.service';
import { LaunchActionTypes, LaunchesLoaded } from './launch.actions';
import { mergeMap, map } from 'rxjs/operators';


@Injectable()
export class LaunchEffects {
  @Effect()
  public load$ = this.actions$
    .ofType(LaunchActionTypes.LoadLaunches)
    .pipe(
      mergeMap(() =>
        this.api
          .getLaunches$()
          .pipe(map(launches => new LaunchesLoaded(launches)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
