import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userempresafilter'
})
export class UserempresafilterPipe implements PipeTransform {

  transform(items: any[]): any {
    if( !items )
      return items;
    return items;
  }

}
