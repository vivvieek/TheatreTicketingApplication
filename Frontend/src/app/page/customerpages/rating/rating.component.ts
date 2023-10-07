import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { LoginService } from 'src/app/servicefiles/login.service';
import { forkJoin } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{

  ratemovie!:FormGroup
  item:any={
    name:'',
    image:'',
    rating:'',
  };
  id:any;
  currentUser:any;

  ratevalue: string='1';
  review: string ='#No Review';

  constructor(
    private serv:DatasService,
    private serv2:LoginService,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private router: Router){

      this.ratemovie=new FormGroup ({
        "rating" : new FormControl(""),
      })
    }


  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    this.currentUser=this.serv2.getUser();
    this.serv.getonemovie(this.id).subscribe((data)=>{
      this.item=data
      console.log(this.item)
      this.ratemovie=this.fb.group({
        "rating" : this.item.rating,
      })
    })
  }

  rateselected(rate:string){
    this.ratevalue=rate;
  }

  reviewselected(review:string){
    this.review=review;
    const moviename=this.item.name;
  }

  onsubmit() {
    const ratedValue = +this.ratevalue;
    const ratevalue = +this.item.rating;
  
    const average = ((ratedValue + ratevalue) / 2).toFixed(1);
  
    this.ratemovie.patchValue({
      rating: average,
    });
  
    const addReviewObservable = this.serv.addreview(this.currentUser, this.item.name, this.review);
  
    addReviewObservable.pipe(
      // Check if addreview was successful before calling editmovie
      filter(addReviewResult => !addReviewResult.error),
      switchMap(() => {
        // If addreview was successful, call editmovie
        return this.serv.editmovie(this.ratemovie.value, this.id);
      })
    ).subscribe(
      (editMovieResult) => {
        alert("Reviews posted");
        this.router.navigate(['']);
      },
      (error) => {
        // console.error("An error occurred:", error);
        alert("Review Already Done");
        this.router.navigate(['']);
      }
    );
  }


}