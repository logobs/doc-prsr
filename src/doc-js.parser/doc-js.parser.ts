import { BaseParser } from '../base-parser';
import { 
        Model, 
        Class, 
        ClassKind,
        Metadata, 
        Example, 
        Method, 
        Param, 
        Platform, 
        Prop, 
        PropKind,
        Language, 
        Framework, 
        Generator 
} from '../model';
import { ClassOptions, CommonOptions } from './doc-js.options';

export class DocJSParser extends BaseParser {
  getClasses(json: any[]): Class[] {
    return json
        .filter(item => item[ClassOptions.classKind] === 'class')
        .map(item => this.parseClass(item));
    }

  getExamples(obj: any): Example[] {
    return obj[CommonOptions.examples]
            .map((item: any) => this.parseExample(item));
  }

  getProps(obj: any): Prop[] {
    return obj[CommonOptions.properties]
            .map((item: any) => this.parseProp(item));
  }

  getMethods(obj: any): Method[] {// where are methods??
    return obj[ClassOptions.methods] ? obj[ClassOptions.methods].map((item: any) => this.parseMethod(item)) : [];
  }

  getKind(obj: any): ClassKind {//names
    return obj[ClassOptions.classKind] ? obj[ClassOptions.classKind] : '';
  }

  getPropKind(obj: any): PropKind {
    return obj[CommonOptions.kind] ? obj[CommonOptions.kind] : 'prop';
  }

  getPropType(obj: any):string {
    return obj[CommonOptions.type] ? obj[CommonOptions.type] : '';
  }

  getPlatform(obj: any): Platform {
    return obj[CommonOptions.platform] ? obj[CommonOptions.platform] : 'ios';
  }

  parseExample(obj: any): Example {
    if (obj[CommonOptions.description] || obj[CommonOptions.code]) {
      return new Example(obj[CommonOptions.description], obj[CommonOptions.code]);
    } else {
      return new Example();
    }
  }

  parseProp(obj: any): Prop | null {
    if (obj[CommonOptions.title] && obj[CommonOptions.title] === 'property') {
      return new Prop({
        kind: this.getPropKind(obj),
        platform: this.getPlatform(obj),
        isStatic: this.isStatic(obj),
        type: this.getPropType(obj),
        required: this.isRequired(obj),
        name: this.getName(obj),
        description: this.getDescription(obj),
        shortDescription: this.getShortDescription(obj)
      });
    } else {
      return null;
    }
  }

  getShortDescription(obj: any): string {//????
    return obj[CommonOptions.shortDescription] ? obj[CommonOptions.shortDescription] : '';
  }

  getDescription(obj: any): string {
    return obj[CommonOptions.description] ? obj[CommonOptions.description].type : '';
  }

  isStatic(obj: any): boolean {// where is isStatic?
     return obj[CommonOptions.static] ? true : false;
  }

  getName(obj: any): string {
    return obj[CommonOptions.name] ? obj[CommonOptions.name] : '';
  }

  isRequired(obj: any): boolean {
    return obj[CommonOptions.required] ? true : false;
  }
}