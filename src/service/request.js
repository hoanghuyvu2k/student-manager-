let request={}

request.request=async (url, method,body )=>{
    const response = await fetch(url , {

        method: method,
        headers: {
          'Content-Type': 'application/json',
          'authorization':'Beared ' + sessionStorage.token 
        },
        body: JSON.stringify(body),
      })
      
    return response
    
}   

export default request
