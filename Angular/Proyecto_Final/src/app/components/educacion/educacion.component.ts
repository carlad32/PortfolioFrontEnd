import { Component } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  edu: Educacion[] = [];

  constructor(private sEducacion: EducacionService, private tokenService: TokenService){}

  isLogged = false;


  ngOnInit(): void {
    this.cargarEstudios();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else{
      this.isLogged = false;
    }
  }

  cargarEstudios(): void{
    this.sEducacion.lista().subscribe(data => {this.edu = data;})
  }

  delete(id?: number): void{
    if(id != undefined){
      this.sEducacion.delete(id).subscribe(
        data => {
          this.cargarEstudios();
        }, err => {
          alert("No se pudo borrar");
        }
      )
    }
  }
}
