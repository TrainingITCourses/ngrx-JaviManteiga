import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/reducers';
import { LoadAgencys } from 'src/app/reducers/agency/agency.actions';
import { LoadTypes } from 'src/app/reducers/type/type.actions';
import { LoadStatuses } from 'src/app/reducers/status/status.actions';
import { LoadLaunches } from 'src/app/reducers/launch/launch.actions';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit {
  public filteredLaunches$: Observable<any[]>;
  public listToShow$: Observable<any[]>;
  private filterType: string;

  constructor(private global: Store<GlobalState>) { }

  ngOnInit() {
    this.loadData();
  }

  onSearch = (searchParam: string) => {
    if (this.filterType === 'estado') {
      const filteredLaunches = this.global.select('launch').pipe(
        map(x => x.launches.filter(l => l.status == searchParam))
      );
      this.filteredLaunches$ = filteredLaunches;
    } else if (this.filterType === 'agencia') {
      const filteredLaunches = this.global.select('launch').pipe(
        map(x => x.launches.filter(l =>
          (!isNullOrUndefined(l.rocket) && !isNullOrUndefined(l.rocket.agencies) && l.rocket.agencies.some(n => n.id == searchParam) ||
            l.missions.some(m => !isNullOrUndefined(m.agencies) && m.agencies.some(a => a.id == searchParam)) ||
            l.location.pads.some(p => !isNullOrUndefined(p.agencies) && p.agencies.some(a => a.id == searchParam)))
        )));
      this.filteredLaunches$ = filteredLaunches;
    } else if (this.filterType === 'tipo') {
      const filteredLaunches = this.global.select('launch').pipe(
        map(x => x.launches.filter(l =>
          l.missions.some(n => n.type == searchParam) ||
          (!isNullOrUndefined(l.lsp) && l.lsp.type == searchParam)
        )));
      this.filteredLaunches$ = filteredLaunches;
    }
  }

  public onSelectFilterType($event: string) {
    this.filterType = $event;
    if ('estado' === $event) {
      // Acceso al store con arrow function
      this.listToShow$ = this.global.select(x => x.status).pipe(map(x => x.statuses));
    } else if ('agencia' === $event) {
      this.listToShow$ = this.global.select('agency').pipe(map(x => x.agencies));
    } else if ('tipo' === $event) {
      this.listToShow$ = this.global.select('type').pipe(map(x => x.types));
    }
    this.filteredLaunches$ = of([]);
  }

  private loadData() {
    this.global.dispatch(new LoadAgencys());
    this.global.dispatch(new LoadTypes());
    this.global.dispatch(new LoadStatuses());
    this.global.dispatch(new LoadLaunches());
  }
}
