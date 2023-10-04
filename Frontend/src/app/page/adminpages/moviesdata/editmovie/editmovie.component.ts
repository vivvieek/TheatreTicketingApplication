import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent {

  showPreview(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const src = URL.createObjectURL(target.files[0]);
      const preview = document.getElementById("file-ip-1-preview") as HTMLImageElement;
      preview.src = src;
      preview.style.display = "block";
    }
  }

  editmovie!:FormGroup
  constructor(private serv:DatasService, private activatedRoute:ActivatedRoute,private fb:FormBuilder,private router:Router){

  this.editmovie=new FormGroup({
    "name": new FormControl(""),
    "category": new FormControl(""),
    "language": new FormControl(""),
    "cast": new FormControl(""),
    "description": new FormControl(""),
    "rating": new FormControl(""),
    "seats": new FormControl(""),
    "price": new FormControl(""),
    "screen": new FormControl(""),
    "image": new FormControl(""),
  })

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
        "image":this.item.image,
      })
    })
  }

  onsubmit(){
    console.log(this.editmovie.value)
    this.serv.editmovie(this.editmovie.value,this.id).subscribe(data=>{
      console.log(data)
      alert("Detail updated")
      this.router.navigate(['movielist'])
    })
  }

}
