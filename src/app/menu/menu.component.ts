import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  title = "Manage Controller Link Page";
  statusCode: number;
  menus: Array<any>;
  requestProcessing = false;
  IdMenuToUpdate = null;
  processValidations = false;

  //CONSTRUCTOR
  constructor(private _menuService : MenuService) { }

  //IMPLEMENT NG-ON INIT
  ngOnInit(): void{
    this.getListMenus()
  }

  //GRAB ALL DATA COMPONENT
  getListMenus(){
    this._menuService.getServiceListMenu()
    .subscribe(data => this.menus = data,
    errorCode => this.statusCode = errorCode)
  }

  //COMPONENT FORM ANGULAR
  formMenu = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  });

  //COMPONENT FORM VALIDATION
  preProcessConfiguration(){
    this.statusCode = null;
    this.requestProcessing = true;
  }

  //BACK TO CREATE
  backToCreateMenu(){
    this.IdMenuToUpdate = null;
    this.formMenu.reset();
    this.processValidations = false;
  }

  //ON LOAD EDIT
  updateMenu(idmenus: string){
    this.preProcessConfiguration();
    this._menuService.getById(idmenus).subscribe( menu=> {
      this.IdMenuToUpdate = menu.idmenus;
      this.formMenu.setValue({name: menu.name, link: menu.link});
      this.processValidations = true;
      this.requestProcessing = false;
    }, errorCode => this.statusCode = errorCode);
  }

  //ON DELETE
  deleteMenu(idmenus: string){
    if(confirm('yakin ingin hapus data '+idmenus+ ' ?')){
      this._menuService.getDeleteMenu(idmenus)
      .subscribe(successCode => {
        this.getListMenus();
        this.statusCode = successCode;
        this.backToCreateMenu();
      }, errorCode => this.statusCode = errorCode);
    }
  }

  //ON HANDLING SUBMIT INSERT & UPDATE
  onHandlingSubmit(){
    this.processValidations = true;
    if(this.formMenu.invalid){
      return;
    }
    //insert handling
    this.preProcessConfiguration();
    let name = this.formMenu.get('name').value.trim();
    let link = this.formMenu.get('link').value.trim();
    if(this.IdMenuToUpdate === null){
      let menu = new Menu(null, name, link);
      this._menuService.getSaveMenu(menu)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListMenus();
        this.backToCreateMenu();
      }, errorCode => this.statusCode = errorCode);
    //update handling
    }else{
      let menu = new Menu(this.IdMenuToUpdate, name, link);
      this._menuService.getUpdateMenu(menu)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListMenus();
        this.backToCreateMenu();
      }, errorCode => this.statusCode = errorCode);
    }
  }

}
