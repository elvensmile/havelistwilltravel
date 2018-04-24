import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'workingTime'
})
export class WorkingTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {


    const arrayWithTime = value;
    const strings = [];
    arrayWithTime.forEach(item => {

      const notFormatted = [...item.open];
      let c = '';

      for (let i = 0; i < notFormatted.length; i++) {

        c += item.open[i].renderedTime + '; ';


      }

      const a = `${(item.days)} : ${c}`;
      strings.push(a);


    });

    return strings.join('\n');

  }

}
