import { Component } from '@angular/core';
import { GlobalsService } from './globals/globals.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The Wind Logger 2.0';

  constructor ( 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    protected globals: GlobalsService, 
    private router: Router) {
    const me = this,
          username = me.globals.getUserNameFromLocalStorage();

    if (username === '') {
      me.router.navigate(['/login']);
    } else {
      me.globals.setUser(username);
      me.router.navigate(['/mainscreen']);
    }
    me.registerSvgIcons();
  }

  logout() {
    const me = this;

    me.globals.clearUser();
    me.globals.removeUserDataFromLocalStorage();
    me.router.navigate(['/']);
  }

  registerSvgIcons() {
    const me = this;

    me.matIconRegistry.addSvgIcon("home", me.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svgIcons/home-24px.svg"));
    me.matIconRegistry.addSvgIcon("email", me.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svgIcons/email.svg"));
    me.matIconRegistry.addSvgIcon("github", me.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svgIcons/github.svg"));
    me.matIconRegistry.addSvgIcon("linkedin", me.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svgIcons/linkedin.svg"));
  }
}
