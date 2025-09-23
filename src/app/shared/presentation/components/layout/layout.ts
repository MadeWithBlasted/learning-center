import { Component } from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbar,
    MatToolbarRow,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
    MatButton
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  options = [
    { link: '/home',  label: 'option.home'},
    { link: '/about', label: 'option.about'},
  ]
}
