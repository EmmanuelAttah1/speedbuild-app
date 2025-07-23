import { getCookie, setCookie } from "./utilis"

const address = "http://127.0.0.1:8000/api/"

const accessTokenLifespan = 50 // minutes
const refreshTokenLifespan = 1 // days

type RefreshTokenResponse = {
    access:string,
    refresh:string
}

const getRequestUrl=(address:string,params:Record<string, string>)=>{
    let url = address

    for(const i in params){
        if(!url.includes("?")){
            url += `?${i}=${params[i]}`
        }else{
            url += `&${i}=${params[i]}` 
        }
    }

    return url;
}

function preparePayload(
    data?: Record<string, string>,
    files?: Record<string, File>,
    sendAsJson:boolean = false
  ): FormData | string {

    if(sendAsJson){
        return JSON.stringify(data)
    }

    const form = new FormData();
    // Append string data
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      }
    }
  
    // Append file data
    if (files) {
      for (const [key, file] of Object.entries(files)) {
        if (file instanceof File) {
          form.append(key, file);
        }
      }
    }
  
    return form;
  }  

  
export const manageServerCall=async(
        method:string,path:string,
        urlparams?:Record<string, string>,
        data:any={},
        useToken=false,
        serverCookies:Record<string,string>={},
        files:Record<string,File>={},
        sendAsJson:boolean=false
    )=>{

    return new Promise((resolve,rej)=>{
        let url = `${address}${path}`

        const payload = preparePayload(data as Record<string,string>,files,sendAsJson)

        const headers: Record<string,string>= {}
        const requestBody = method === "post" || method === "put" ? payload : null


        if(sendAsJson){
            headers['Content-Type'] = "application/json"
        }

        //console.log( serverCookies['access'] !== undefined , " here with cookies ", serverCookies);
        

        if(useToken){
            const accessToken = serverCookies['access'] !== undefined ? serverCookies['access'] : getCookie("access")
            //console.log("access token ",accessToken);
            
            if(accessToken !== ""){
                headers["Authorization"] = `Bearer  ${accessToken}`

                //console.log(headers);
                
            }else{
                //access token has expired
                const refreshToken = serverCookies['refresh'] !== undefined ? serverCookies['refresh'] : getCookie("refresh")
                if(refreshToken !== ""){
                    manageServerCall("post","user/token/refresh/",{},{refresh:refreshToken},false)
                    .then(res=>{
                        const response = res as RefreshTokenResponse
                        setCookie("access",response["access"],accessTokenLifespan,"minute")
                        setCookie("refresh",response["refresh"],refreshTokenLifespan)

                        if(serverCookies['access'] !== undefined ){
                            serverCookies = {
                                access: response['access'],
                                refresh: response['refresh']
                            }
                        }
                        // update headers
                        headers["Authorization"] = `Bearer  ${response['access']}`
                        //console.log(headers);
                        
                    })
                }else{
                    //console.log("session has expired");
                    rej("session has expired")
                    // session expired
                    // logout user
                }
            }
        }

        const requestObject = {
            method:method,
            body: requestBody,
            headers:headers
        }

        //console.log(requestBody," body");
        
        if(urlparams){
            if(Object.keys(urlparams).length > 0){
                url = getRequestUrl(url,urlparams)
            }
        }

        if(method === "post" || method === "put"){
            requestObject["body"] = payload
            // requestObject['headers']["Content-Type"] = "multipart/form-data"//"application/json"
        }

        fetch(url,requestObject)
        .then((data)=>{
            if (!data.ok) {
                // Throw error if status is not 2xx (e.g., 400, 500)
                return data.json().then(err => {
                    rej(err)
                });
            }

            const contentType = data.headers.get("Content-Type");

            // Handle PDF or other binary responses
            
            if (contentType) {
                if (
                contentType.includes("application/pdf") ||
                contentType.includes("application/zip") ||
                contentType.includes("application/octet-stream")
                ) {
                    return data.blob(); // <- Handle all binary files
                }
            }
    
            return data.json()
        })
        .then(res=>{
            if (res instanceof Blob) {
                // Just resolve the Blob (e.g. PDF file)
                resolve(res);
                return;
            }
            resolve(res)
        })
        .catch(
            (err) => {
                rej(err)
            }
        )
    })
}
