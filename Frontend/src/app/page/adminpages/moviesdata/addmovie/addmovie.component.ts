import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  imagePreview: any;

  constructor(
    public datasService: DatasService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  form: FormGroup = this.fb.group({
    name: [''],
    language: [''],
    category: [''],
    cast: [''],
    description: [''],
    rating: [''],
    seats: [''],
    price: [''],
    screen: [''],
    image: [null]
  });

  ngOnInit(): void {}

  showPreview(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const src = URL.createObjectURL(target.files[0]);
      const preview = document.getElementById("file-ip-1-preview") as HTMLImageElement;
      preview.src = src;
      preview.style.display = "block";
      this.imagePreview = src;
    }
  }

  onSelectImage(event: any) {
    if (event?.target instanceof HTMLInputElement) {
      const file = event.target.files?.[0];
      if (file) {
        console.log(file.type);
        this.form.patchValue({
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

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('category', this.form.value.category);
    formData.append('language', this.form.value.language);
    formData.append('cast', this.form.value.cast);
    formData.append('description', this.form.value.description);
    formData.append('rating', this.form.value.rating);
    formData.append('seats', this.form.value.seats);
    formData.append('price', this.form.value.price);
    formData.append('screen', this.form.value.screen);
    formData.append('image', this.form.value.image);

    this.datasService.addmovie(formData)
      .subscribe((res: any) => {
        this.router.navigate(['']);
        this.form.reset();
        this.imagePreview = null;
      });
  }
}