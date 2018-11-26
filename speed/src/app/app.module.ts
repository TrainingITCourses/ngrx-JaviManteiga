import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchContainerComponent } from './shared/search/search-container.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterTypeComponent } from './shared/search-filter-type/search-filter-type.component';
import { SearchFilterComponent } from './shared/search-filter/search-filter.component';
import { LaunchResultsComponent } from './shared/launch-results/launch-results.component';
import { LaunchResultsCountComponent } from './shared/launch-results-count/launch-results-count.component';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { reducers, metaReducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AgencyEffects } from './reducers/agency/agency.effects';
import { LaunchEffects } from './reducers/launch/launch.effects';
import { StatusEffects } from './reducers/status/status.effects';
import { TypeEffects } from './reducers/type/type.effects';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchContainerComponent,
    SearchFilterTypeComponent,
    SearchFilterComponent,
    LaunchResultsComponent,
    LaunchResultsCountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
    EffectsModule.forRoot([AgencyEffects, LaunchEffects, StatusEffects, TypeEffects]),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
