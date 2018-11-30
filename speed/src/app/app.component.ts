import { Component } from '@angular/core';
import { UpdateAvailableEvent, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'speed';
  public developerVersion = '3.1';

  constructor(swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      swUpdate.available.subscribe(
        (event: UpdateAvailableEvent) => {
          const msg = 'Cargar nueva versión de la app?';
          if (confirm(msg)) { window.location.reload(); }
        }
      );
    }
  }
}
