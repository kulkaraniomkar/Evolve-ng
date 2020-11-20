import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { MenuService } from 'src/app/services/menu.service';
import * as SettingsActions from 'src/app/store/actions/settings.actions';
import { selectSetting } from 'src/app/store/selectors/setting.selector';
import { selectUserState } from 'src/app/store/selectors/user.selector';
import { iif } from 'rxjs';

@Component({
  selector: 'emui-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent implements OnInit {
  @Input() isMenuCollapsed: boolean = false
  isLightTheme: boolean
  isSettingsOpen: boolean
  isMobileView: boolean
  menuData: any[]
  menuDataActivated: any[]
  subscribeToDefault: boolean = true;

  constructor(
    private menuService: MenuService,
    private store: Store<any>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectUserState),
      distinctUntilChanged(),
      switchMap((user) => {

        if (user['roles'].indexOf('mentoringadmin') >= 0) {
          console.log("admin")
          return this.adminMenu()
        } else {
          return this.defaultMenu()
        }


      })).subscribe(
        menuData => {
          console.log("Ment ", menuData);
          this.menuData = menuData;
          this.activateMenu(this.router.url)
        }
      );
    // this.store.pipe(select(selectUserState), distinctUntilChanged()).subscribe(
    //   userInfo => {
    //     if (userInfo['roles'].length) {
    //       console.log("dddd", userInfo['roles'].indexOf('mentoringadmin'))
    //       if (userInfo['roles'].indexOf('mentoringadmin') >= 0) {
    //         this.subscribeToDefault = false;
    //       }

    //     }
    //   }
    // )
    // this.menuItems();
    // this.menuService.getLeftMenuData().subscribe(menuData => (this.menuData = menuData))

    this.store.pipe(select(selectSetting)).subscribe(state => {
      this.isLightTheme = state.isLightTheme
      this.isMobileView = state.isMobileView
    })
    this.activateMenu(this.router.url)
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.activateMenu(event.url ? event.url : null)
      })
  }

  defaultMenu() {
    return this.menuService.getLeftMenuData()
  }
  adminMenu() {
    return this.menuService.getAdminMenuData()
  }
  // menuItems() {
  //   console.log(this.subscribeToDefault)
  //   const defaultOrAdmin = iif(
  //     () => this.subscribeToDefault,
  //     this.menuService.getLeftMenuData(),
  //     this.menuService.getAdminMenuData()
  //   );
  //   defaultOrAdmin.subscribe(menuData => (this.menuData = menuData));
  // }
  activateMenu(url: any, menuData = this.menuData) {
    menuData = JSON.parse(JSON.stringify(menuData));
    const pathWithSelection = this.getPath({ url: url }, menuData, (entry: any) => entry, 'url');
    if (pathWithSelection) {
      pathWithSelection.pop().selected = true;
      _.each(pathWithSelection, (parent: any) => (parent.open = true));
    }
    this.menuDataActivated = menuData.slice();
  }

  getPath(
    element: any,
    source: any,
    property: any,
    keyProperty = 'key',
    childrenProperty = 'children',
    path = [],
  ) {
    let found = false
    const getElementChildren = (value: any) => _.get(value, childrenProperty);
    const getElementKey = (value: any) => _.get(value, keyProperty);
    const key = getElementKey(element)
    return (
      _.some(source, (e: any) => {
        if (getElementKey(e) === key) {
          path.push(e)
          return true
        } else {
          return (found = this.getPath(
            element,
            getElementChildren(e),
            property,
            keyProperty,
            childrenProperty,
            path.concat(e),
          ))
        }
      }) &&
      (found || _.map(path, property))
    )
  }

  toggleSettings() {
    this.store.dispatch(
      new SettingsActions.SetSettingAction({
        isSettingsOpen: !this.isSettingsOpen,
      }),
    )
  }
}
