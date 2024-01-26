import { Component } from '@angular/core';

interface MenuItems{
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``,
})
export class SideMenuComponent {
  public reactiveMenu: MenuItems[] = [
    { title: 'Báiscos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItems[] = [
    { title: 'Registro', route: './auth/register' },
  ];
}
