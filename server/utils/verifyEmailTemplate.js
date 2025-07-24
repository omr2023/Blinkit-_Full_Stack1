const verifyEmailTemplate = ({name,url})=>{
return`
        <p>Dear ${name}</p>
        <p>Tank you for registering Binkeyit.</p>
        <a href=${url} style="color:white,background: blue, text:cuntar, margine-top : 10px">
        Verify Email
        </a>
        
`
}

export default verifyEmailTemplate;