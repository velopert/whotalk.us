function getLang()
{
 if (navigator.languages != undefined) 
 return navigator.languages[0]; 
 else 
 return navigator.language;
}

export default getLang;