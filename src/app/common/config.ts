import { environment } from "src/environments/environment";
import {Location} from "@angular/common";

export namespace AppConfig {
  export function apiUrl(path: any) {
    return Location.joinWithSlash(environment.api_url, path);
  }
}
