import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  // public myForm2 = new FormGroup({
  // favorites: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Mortal Kombat', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);


  constructor(private fb: FormBuilder) {}

  get favoriteGamesControl() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string) {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) {
      return null;
    }

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }

    return null;
  }


  onAddToFavorites():void{
    if(this.newFavorite.invalid) {
      return;
    }

    const newGame = this.newFavorite.value;

    this.favoriteGamesControl.push(
      this.fb.control(newGame, Validators.required)
    )

    this.newFavorite.reset();
  }

  onDelete(index: number):void{
    this.favoriteGamesControl.removeAt(index);
  }


  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // No se usa favoriteGamesControl porque es un Getter, el cual es solo para lectura,
    // osea es como asignar valor a una constantes, no se puede, usar setter en caso de que se requiera
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
