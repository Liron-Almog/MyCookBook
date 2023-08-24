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
    get(extraData:string) :Observable<any> { 
        return this.http.get(this.url + extraData);
    }
    delete(){
        
    }
    post(){
        
    }
    


}