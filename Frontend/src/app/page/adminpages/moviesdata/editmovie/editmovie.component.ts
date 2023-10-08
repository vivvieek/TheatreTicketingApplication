import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent {

  editmovie!:FormGroup
  imagePreview: any;

  constructor(
    private serv:DatasService, 
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private router:Router){
      this.editmovie = this.fb.group({
        name: ['', Validators.required], 
        category: ['', Validators.required], 
        language: ['', Validators.required],
        cast: ['', Validators.required],
        description: ['', Validators.required], 
        rating: ['', [Validators.required, Validators.pattern(/^[1-5]$/)]],
        seats: ['', [Validators.required, Validators.pattern(/^(3[0-9]|4[0-9]|50)$/)]],
        price: ['', [Validators.required, Validators.pattern(/^(?:30\d|2[0-9][0-9]|1[5-9][0-9]|150)$/)]],
        screen: ['', Validators.required],
      });
  }
  
  item:any;
  id:any;

  ngOnInit():void{
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    this.serv.getonemovie(this.id).subscribe((data)=>{
      this.item=data
      console.log(this.item)
      this.editmovie=this.fb.group({
        "name":this.item.name,
        "category":this.item.category,
        "language":this.item.language,
        "cast":this.item.cast,
        "description":this.item.description,
        "rating":this.item.rating,
        "seats":this.item.seats,
        "price":this.item.price,
        "screen":this.item.screen,
      })
    })
  }



  onsubmit() {
    if (this.editmovie.valid) {
      console.log(this.editmovie.value);
      this.serv.editmovie(this.editmovie.value, this.id).subscribe(data => {
        console.log(data);
        alert("Detail updated");
        this.router.navigate(['movielist']);
      });
    } else {
      alert("Please fill in all required fields with valid values.");
    }
  }

}