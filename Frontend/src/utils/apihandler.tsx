const SERVER_IP = "http://192.168.29.176"
const SERVER_PORT = 8080

const URL = `${SERVER_IP}:${SERVER_PORT}`

export async function getQuestion(){
    return fetch(requestPath("getQuestion"))
        .then(data => data.json())
        .then(json => {
            document.cookie = `token=${json['token']}`
            return json
        })    
}

function requestPath(endPoint: string){
    return `${URL}/${endPoint}`
}