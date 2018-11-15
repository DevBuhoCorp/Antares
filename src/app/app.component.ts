import {Component, OnInit, AfterViewInit, Renderer2} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {RoutePartsService} from './shared/servicios/route-parts.service';
import {ThemeService} from './shared/servicios/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'Sistema Contable';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.themeService.applyMatTheme(this.renderer);
  }
}
