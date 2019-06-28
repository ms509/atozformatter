import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent implements OnInit {

  public data: string;
  public jsonData: string
  constructor() { }

  ngOnInit() {
  }

  formatJson(json: string) {
    console.log(json);
    const indentChar = '    ';
    const newLineChar = '\n';
    let result = '';
    let i = 0;
    let quoteCount = 0;
    let isValue = false;
    for (const char of json) {
      switch (char) {
        // tslint:disable-next-line:max-line-length
        case '{':  if (quoteCount % 2 !== 0 || isValue) {
                      if ( isValue ) {
                        result = result.concat(' ').concat(char).concat(newLineChar).concat(indentChar.repeat(i));
                        i += 1;
                      } else {
                        result = result.concat(char);
                      }
                    } else {
                      result = result.concat(indentChar.repeat(i))
                        .concat(char)
                        .concat(newLineChar)
                        .concat(indentChar.repeat(i));
                      i += 1;
                    }
                   isValue = false;
                   break;
        case '}': if ( i !== 0 ) {
                    i -= 1;
                  }
                  if (quoteCount % 2 !== 0) {
                    result = result.concat(char);
                  } else {
                    result = result.concat(newLineChar).concat(indentChar.repeat(i)).concat(char);
                  }
                  isValue = false;
                  break;
        case ':': result = result.concat(' ').concat(char).concat(' ');
                  isValue = true;
                  break;
        case ',': if (quoteCount % 2 !== 0) {
                    result = result.concat(char);
                  } else {
                    result = result.concat(char).concat(newLineChar).concat(indentChar.repeat(i - 1));
                  }
                  isValue = false;
                  break;
        case '"': if ( quoteCount % 2 === 0 && !isValue) {
                    result = result.concat(indentChar.repeat(i));
                  }
                  quoteCount++;
                  result = result.concat(char);
                  isValue = false;
                  break;
        case '\n': break;
        case ' ': break;
        case '\t': break;
        case '[' : i += 1;
                   result = result.concat(char).concat(newLineChar).concat(indentChar.repeat(i));
                   break;
        case ']' : result = result.concat(newLineChar).concat(indentChar.repeat(i)).concat(char);
                   i -= 1;
                   break;

        default : result = result.concat(char);
                  break;

      }
      console.log(result);
    }
    this.jsonData = result;
  }
}
