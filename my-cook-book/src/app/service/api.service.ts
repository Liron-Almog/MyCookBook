import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs';

@Injectable({providedIn:"root"})
export class ApiService{

    private url = `http://localhost:3000`;
    constructor(private http:HttpClient){}

    setUrl(newUrl:string){
        this.url = newUrl;
    }
    get(pathAndParams:string) :Observable<any> { 
        return this.http.get(this.url + pathAndParams,{ withCredentials: true });
    }
    delete(pathAndParams:string){
        return this.http.delete(this.url + pathAndParams);
    }
    post(path:string,postData:any){   
        return this.http.post(this.url + path,postData,{ withCredentials: true });
    }
    
}