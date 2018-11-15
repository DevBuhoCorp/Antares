import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(value: any[]): any {

    let noimage = "assets/images/placeholder.jpg";
    if( !value ){
      return noimage;
    }
   return value;
  }

}
