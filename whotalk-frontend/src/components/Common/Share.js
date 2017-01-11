import React from 'react';
import facebook from 'assets/facebook.png';
import kakaostory from 'assets/kakaostory.png';
import twitter from 'assets/twitter.png';


const Share = ({hide, username}) => {
    if(hide) {
        return null;
    }
    return (
        <div className="share">
            <div className="ui input">
                <input size={("https://whotalk.us/" + username).length -2} onClick={ (e) => { e.target.select();} } className="url" type="text" value={"https://whotalk.us/" + username} readOnly={true}/>
            </div>

            <img 
                onClick={
                    () => {window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(document.URL)+'&t='+encodeURIComponent(document.title), 
                                        'facebooksharedialog',
                                        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')}
                }
                alt="facebook" className="ui mini circular image" src={facebook}/>
            <img 
                onClick={
                    () => {window.open('https://story.kakao.com/s/share?url='+encodeURIComponent(document.URL), 
                            'kakaostorysharedialog', 
                            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600')}
                }
            alt="kakaostory" className="ui mini circular image" src={kakaostory}/>
            <img 
                onClick={
                    () => {window.open('https://twitter.com/intent/tweet?text=WhoTalk%20:%20%EC%9D%B5%EB%AA%85%EC%9C%BC%EB%A1%9C%20%EB%A7%90%EC%9D%84%20%EA%B1%B8%EC%96%B4%EB%B3%B4%EC%84%B8%EC%9A%94 - '+encodeURIComponent(document.URL)+'%20-%20', 
                            'twittersharedialog',
                            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')}
                }
            alt="twitter" className="ui mini circular image" src={twitter}/>
        </div>
    );
};

export default Share;