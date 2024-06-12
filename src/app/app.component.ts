/**
 * Title: app.component.ts
 * Author: Evelyn Zepeda & Professor Krasso
 * Date: 6/9/24
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
