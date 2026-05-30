import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-cms',
  templateUrl: './admin-cms.html',
})
export class AdminCms {
  readonly banners = [
    { id: '1', title: 'Summer Sale', active: true, slot: 'Home Hero' },
    { id: '2', title: 'Free Shipping Over $100', active: true, slot: 'Top Bar' },
    { id: '3', title: 'New Arrivals', active: false, slot: 'Home Hero' },
  ];
}
