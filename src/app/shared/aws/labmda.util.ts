import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var AWS;

@Injectable()
export class LambdaUtil {

    constructor(
        private http: HttpClient
    ) {}

    public constructLambda(method: string, functionName: string, payload: Object): Promise<any> {
        return new Promise((resolve, reject) => {

            const uri = `http://localhost:3000/${functionName}`;

            switch (method) {
                case 'get':
                    this.http.get(uri).subscribe(rt => resolve(rt));
                    break;

                case 'post':
                    this.http.post(uri, payload).subscribe(rt => resolve(rt));
                    break;

                case 'put':
                    this.http.put(uri, payload).subscribe(rt => resolve(rt));
                    break;

                case 'delete':
                    this.http.delete(uri, payload).subscribe(rt => resolve(rt));
                    break;
                default:
                    break;
            }

            // const lambda = new AWS.Lambda();
            // const params = {
            //     FunctionName: functionName,
            //     Payload: JSON.stringify(payload)
            // };

            // lambda.invoke(params, function (err, data) {
            //     if (err) {
            //         console.log(err.stack);
            //     } else {
            //         resolve(JSON.parse(data.Payload));
            //     }
            // });
        });
    }

}
