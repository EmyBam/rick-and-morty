import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: any, term: any): any {
    if (term && value) {
      const startIndex = value.toLowerCase().indexOf(term.toLowerCase());
      if (startIndex !== -1) {
        const endLength = term.length;
        const matchingString = value.substr(startIndex, endLength);
        return value.replace(matchingString, `<span class="highlighted">${matchingString}</span>`);
      }
    }
    return value;
  }

}
