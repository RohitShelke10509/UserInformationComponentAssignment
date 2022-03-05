import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user-list-component.model';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponentComponent implements OnInit {
 
    formValue!:FormGroup;
    userModelObj: UserModel = new UserModel();
    userData!:any;
    showAdd!:any;
    showUpdate!:boolean;
    

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void { 
    this.formValue=this.formbuilder.group({
      UserName:[''],
      email:[''],
      mobile:[''],
      Role:[''],
      Status:[''],
   
    })
      this.getAllUsers()
  }
  clickAddUsers(){
    this.formValue.reset()
    this.showAdd=true;
    this.showUpdate=false;
  }
  postUserDetails(){//done post api
    this.userModelObj.UserName=this.formValue.value.UserName;
    this.userModelObj.email=this.formValue.value.email;
    this.userModelObj.mobile=this.formValue.value.mobile;
    this.userModelObj.Role=this.formValue.value.Role;
    this.userModelObj.Status=this.formValue.value.Status;
    this.api.postUsers(this.userModelObj).subscribe(res=>{
      console.log(res);
      alert("Users record added Successfully")
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUsers()//for Instance Update data
    },
     err=>{
      alert("Something went wrong,please check again")
       
    })
  }

  getAllUsers(){//get api done
    this.api.getUsers().subscribe(res=>{
      this.userData=res;
    })
     
  }
  deleteUsers(usr:any){
    this.api.deleteUser(usr.id).subscribe(res=>{
      alert("User records deleted")
      this.getAllUsers()
    })
  }
  onEdit(usr:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.userModelObj.id=usr.id;
    this.formValue.controls["UserName"].setValue(usr.UserName);
    this.formValue.controls["email"].setValue(usr.email);
    this.formValue.controls["mobile"].setValue(usr.mobile);
    this.formValue.controls["Role"].setValue(usr.Role);
    this.formValue.controls["Status"].setValue(usr.Status);
    
  }
  updateUserDetails(){

    this.userModelObj.UserName=this.formValue.value.UserName;
    this.userModelObj.email=this.formValue.value.email;
    this.userModelObj.mobile=this.formValue.value.mobile;
    this.userModelObj.Role=this.formValue.value.Role;
    this.userModelObj.Status=this.formValue.value.Status;
    
    this.api.updateUser(this.userModelObj, this.userModelObj.id).subscribe(res=>{
      alert("User Record Updated")
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUsers()
    })
  }

}
