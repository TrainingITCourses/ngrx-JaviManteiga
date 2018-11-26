import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from 'src/app/reducers/api.service';
import { AgencyActionTypes, AgencysLoaded } from './agency.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class AgencyEffects {
  @Effect()
  public load$ = this.actions$
    .ofType(AgencyActionTypes.LoadAgencys)
    .pipe(
      mergeMap(() =>
        this.api
          .getAgencies$()
          .pipe(map(agencies => new AgencysLoaded(agencies)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
