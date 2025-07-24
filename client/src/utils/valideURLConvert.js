



export const valideURLConvert = (name)=>{

    const url = name?.toString().replace(" ","-").replace(",","-").replaceAll("&" , "-")

        return url
}