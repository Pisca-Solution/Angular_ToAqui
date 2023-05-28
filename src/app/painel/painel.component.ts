import { Component, OnInit, ViewChild } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarComponent } from '@nebular/theme';
import { LoginService } from '../login/service/login.service';
import { Subject, takeUntil, take, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfessorService } from './pages/home/service/professor/professor.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  @ViewChild(NbSidebarComponent) sidebar: NbSidebarComponent | null = null;

  user: any = null;
  userMenu: NbMenuItem[] = [];
  items: NbMenuItem[] = [];
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private nbMenuService: NbMenuService,
    private _authService: LoginService,
    private _professorService: ProfessorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();

    this.logoutListener();
    this.menuClickListener();

    this._professorService.getDados()
      .pipe(take(1), finalize(() => this.spinner.hide()))
      .subscribe((response: any) => {
        this.user = response.nome;

      });

    this.userMenu = [
      { title: 'Log out', icon: 'log-out-outline', data: 'logout' }
    ];

    this.items = [
      { title: 'Chamada QRCode', icon: 'keypad-outline', link: '/painel/chamada-qrcode', pathMatch: 'prefix' },
      { title: 'Chamada Aleatória', icon: 'question-mark-outline', link: '/painel/chamada-qrcode', pathMatch: 'prefix' },
      { title: 'Chamada Manual', icon: 'checkmark-outline', link: '/painel/chamada-qrcode', pathMatch: 'prefix' },
      { title: 'Chamada Carômetro', icon: 'smiling-face-outline', link: '/painel/chamada-qrcode', pathMatch: 'prefix' },
      { title: 'Histórico de Turma', icon: 'calendar-outline', link: '/painel/chamada-qrcode', pathMatch: 'prefix' },
    ];
  }

  toggleSidebar() {
    this.sidebar?.toggle(true);
  }

  private logoutListener() {
    this.nbMenuService.onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(menuItem => {
        if (menuItem.item.data === 'logout')
          this._authService.logout();
      });
  }

  private menuClickListener() {
    document.addEventListener('click', event => {
      const nbMenuClicked = !!(event.composedPath() as any[]).filter((item: HTMLElement) => item.tagName?.toString().toLowerCase() === 'nb-menu').length;
      const nbHeaderClicked = !!(event.composedPath() as any[]).filter((item: HTMLElement) => item.tagName?.toString().toLowerCase() === 'nb-layout-header').length;

      if (this.sidebar?.state === 'expanded') {
        if ((nbMenuClicked && !nbHeaderClicked) || (!nbMenuClicked && !nbHeaderClicked))
          this.sidebar?.compact();
      }
    });
  }
}
