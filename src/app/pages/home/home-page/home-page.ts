import { Component } from '@angular/core';
import { MainLayout } from '../../../layout/main-layout/main-layout/main-layout';
import { Home } from '../../../features/home/home/home';

@Component({
  selector: 'app-home-page',
  imports: [MainLayout, Home],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage {}
