import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  @Input() itemList: any[];
  @Output() public search = new EventEmitter<string>();


  constructor() { }

}
