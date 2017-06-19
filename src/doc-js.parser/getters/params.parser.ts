import {Param} from '../../model';
import {CommonOptions} from '../doc-js.parser.options';
import {Common} from "./common";

export class ParamsParser {

  protected common: Common = new Common();

  getParams(obj: any): Param[] {
    if (obj[CommonOptions.params] && obj[CommonOptions.params].length) {
      return obj[CommonOptions.params].map((item: any) => this.parseParam(item));
    } else {
      return [];
    }
  }

  parseParam(obj: any): Param {
    return new Param({
      name: this.common.getName(obj),
      type: this.getType(obj),
      required: null,
      shortDescription: this.common.getShortDescription(obj),
      description: this.common.getDescription(obj)
    });
  }

  getType(param: any) {
    return param[CommonOptions.paramType] ? param[CommonOptions.paramType][CommonOptions.name] : '';
  }

}