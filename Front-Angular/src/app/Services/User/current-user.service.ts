import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private id = 0;
  private name = "";
  private role = "";

  constructor() { }
  public getIdFromStore(){
    return this.role;
  }

  public setIdForStore(id:number){
    this.id=id;
  }
    public getRoleFromStore(){
      return this.role;
    }

    public setRoleForStore(role:string){
      this.role=role;
    }

    public getNameFromStore(){
      return this.name;
    }

    public setNameForStore(name:string){
      this.name=name;
    }
  }
