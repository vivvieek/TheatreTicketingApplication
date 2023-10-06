import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  imagePreview:any;

  constructor(public datasService:DatasService, private router:Router){}

  ngOnInit(): void {
    
  }

  showPreview(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const src = URL.createObjectURL(target.files[0]);
      const preview = document.getElementById("file-ip-1-preview") as HTMLImageElement;
      preview.src = src;
      preview.style.display = "block";
    }
  }

  onSelectImage(event: any) {
    if (event?.target instanceof HTMLInputElement) {
      const file = event.target.files?.[0];
      if (file) {
        console.log(file.type);
        this.datasService.form.patchValue({
          image: file,
        });
  
        const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedFileTypes.includes(file.type)) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreview = reader.result as string;
          };
          reader.readAsDataURL(file);
        } else {
          console.error('Selected file type is not allowed.');
        }
      } else {
        console.error('No file selected.');
      }
    } else {
      console.error('Invalid event target.');
    }
  }

  onSubmit(){
      this.datasService.addmovie(this.datasService.form.value, this.datasService.form.value.image)
      .subscribe((res: any) => {
        this.router.navigate(['']);
        this.datasService.form.reset();
        this.imagePreview = null;
      })

  }

}