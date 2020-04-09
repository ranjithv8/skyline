import { City, Cities } from '../model/types';
import { DestinationService } from './../services/destination.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  destinations: City[];
  sources: City[];
  favouriteCities: Cities = {};
  searchForm: FormGroup;
  filteredDestinations: Observable<City[]>;
  filteredSources: Observable<City[]>;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private destinationService: DestinationService
  ) { 

  }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchCities();
  }

  fetchCities() {
    this.destinationService.fetch().subscribe((response: Cities) => {
      this.sources = Object.values(response);
      this.destinations = Object.values(response);
      this.filteredSources = this.autoComplete(this.searchForm.get('source'), this.sources);
      this.filteredDestinations = this.autoComplete(this.searchForm.get('destination'), this.destinations);
    });
  }

  setUpForm() {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  search() {
    this.router.navigate(['/search-results'], {
      queryParams: { 
        from: this.searchForm.get('source').value.code,
        to: this.searchForm.get('destination').value.code,
        date: this.formatDate(this.searchForm.get('date').value)
      }
    });
  }

  comparefavourites() {
    this.router.navigate(['/favourites'], { 
      queryParams: { 
        from: this.searchForm.get('source').value.code,
        to: Object.keys(this.favouriteCities).join(','),
        date: this.formatDate(this.searchForm.get('date').value)
      } });
  }

  starDestination(e, city: City) {
    e.stopPropagation();
    city.favourite = !city.favourite;
    if(city.favourite) {
      this.favouriteCities[city.code] = {...city};
    } else {
      delete this.favouriteCities[city.code];
    }
  }

  autoComplete(control: AbstractControl, collection: City[]){
    return control.valueChanges
                        .pipe(
                          map((val) => this.filterCollection(val, collection))
                        );
  }

  filterCollection(value, collection: City[]): City[] {
    const filterValue = value.name ? value.name.toLowerCase() : value.toLowerCase();
    return collection.filter(val => val.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getCityName(city: City){
    return city.name;
  }

  ngOnDestroy() {
    this.destinationService.setFavouriteCities(this.favouriteCities);
  }

  disableComparison() {
    return !(this.searchForm.get('source').valid
            && this.searchForm.get('date').valid
              && Object.keys(this.favouriteCities)?.length);
  }

  formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }


}
