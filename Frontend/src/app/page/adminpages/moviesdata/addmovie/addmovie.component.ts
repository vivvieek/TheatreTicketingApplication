import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {

    formData= new FormData();
    name='';
    category='';
    language='';
    cast='';
    description='';
    rating='';
    seats='';
    price='';
    screen='';
    // image='';



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

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.formData.set('image', file);
    }
  }


  uploadmovie(formData: FormData) {
    formData.append('description', this.description);
    formData.append('name', this.name);
    formData.append('category', this.category);
    formData.append('language', this.language);
    formData.append('cast', this.cast);
    formData.append('rating', this.rating);
    formData.append('seats', this.seats);
    formData.append('price', this.price);
    formData.append('screen', this.screen);

    this.serv.addmovie(formData).subscribe(
      (response) => {
        this.router.navigate(['movielist']);
        console.log('Image uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
}
