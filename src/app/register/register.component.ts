import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../srvices/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [ ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.registerForm = this.fb.group({
      username:["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      // console.log(username,email,password);
      this.api.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
          alert(`Welcome ${res.username}, Please login to explore out recipes`)
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        }, error:(reason:any)=>{
          console.log(reason);
          
          alert(reason)
          this.registerForm.reset
        }
      })

    }else{
      alert("Invalid Form")
    }
  }


}
