import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "../../environments/environment";
import { Storage } from "@ionic/storage";

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient, private storage: Storage) {}

  requestWithoutToken = (url: any, method: any, data: any) => {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/${url}`, data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  requestWithToken = (url: any, method: any, data: any = {}) => {
    return new Promise((resolve, reject) => {
      this.storage.get("userToken").then((token) => {
        this.http
          .post(
            `${SERVER_URL}/${url}`,
            { ...data, _method: method },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .subscribe(
            (data) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
      });
    });
  };
}
