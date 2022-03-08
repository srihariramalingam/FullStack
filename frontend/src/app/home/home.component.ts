import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor(private _router: Router,private service:ApiserviceService) { }
  ngOnInit(): void {
    
  }
  usersForm = new FormGroup({
    'firstname':new FormControl('',Validators.required),
    'lastname':new FormControl('',Validators.required),
    'email':new FormControl('',[Validators.required, Validators.email]),
    'dateofbirth':new FormControl('',Validators.required),
    'mobileno':new FormControl('',Validators.required),
  });
  get firstname()
  {
    return this.usersForm.get('firstname')
  }
  get lastname()
  {
    return this.usersForm.get('lastname')
  }
  get email()
  {
    return this.usersForm.get('email')
  }
  get dateofbirth()
  {
    return this.usersForm.get('dateofbirth')
  }
  get mobileno()
  {
    return this.usersForm.get('mobileno')
  }

  usersSubmit()
  {
    if(this.usersForm.valid)
    {
      console.log(this.usersForm.value)
      this.service.createData(this.usersForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        // this.usersSubmit()
        {
          Swal.fire(
         'Your,s registration sucess!',
          
          )
        }
        this.usersForm.reset();
        this._router.navigate(['/contact'])
        
      });
    }
    else
    {
      console.log('all field is required');
    }
  } 
}
