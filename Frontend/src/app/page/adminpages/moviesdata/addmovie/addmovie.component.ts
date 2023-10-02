import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {


  movie={
    name:'',
    category:'',
    language:'',
    cast:'',
    description:'',
    rating:'',
    seats:'',
    price:'',
    screen:'',
    image:'',
  }

  selectedFile: File | null = null; // To store the selected image file

  constructor(private serv:DatasService, private router:Router){}

  showPreview(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const src = URL.createObjectURL(target.files[0]);
      const preview = document.getElementById("file-ip-1-preview") as HTMLImageElement;
      preview.src = src;
      preview.style.display = "block";
    }
  }

  // onFileSelected(event:any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.movie.image = file;
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('image', this.movie.image);
    formData.append('name', this.movie.name);
    formData.append('category', this.movie.category);
    formData.append('language', this.movie.language);
    formData.append('screen', this.movie.screen);
    formData.append('price', this.movie.price);
    formData.append('seats', this.movie.seats);
    formData.append('rating', this.movie.rating);
    formData.append('description', this.movie.description);
    formData.append('cast', this.movie.cast);

    this.serv.addmovie(formData).subscribe((res) => {
      alert("Movie Added");
      this.router.navigate(['']);
    },
    (error) => {
      console.error('Item upload failed:', error);
    }
    );
  }

}
