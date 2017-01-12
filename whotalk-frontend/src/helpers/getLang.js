function getLang()
{
 if (navigator.languages != undefined && navigator.languages.length !== 0) 
 return navigator.languages[0]; 
 else 
 return navigator.language;
}

export default getLang;