import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.edit){
        handleTweetEdit(e.target.dataset.edit)
    }
    else if(e.target.id === 'main-modal-tweet-btn'){
        handleModalTweetBtnClick()
    }
    else if(e.target.id === 'modal-close'){
        handleModalCloseClick()
    }
    else if(e.target.id === 'inside-modal-tweet-btn'){
        handleInsideTweetBtnClick()
    }
   console.log(e)
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@test`,
            profilePic: `images/no-picture.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }
   // document.body.classList.toggle("dark-mode");
}

function handleInsideTweetBtnClick(){
    const modalTextInput = document.getElementById('modal-tweet-input')

    if(modalTextInput.value){
        tweetsData.unshift({
            handle: `@test`,
            profilePic: `images/no-picture.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: modalTextInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    modalTextInput.value = ''
    document.getElementById('myModal').style.display = "none"
    }
}

function handleTweetEdit(tweetEdit){
    
    let targetTweetObj = tweetsData.filter(function(tweet){
        if(tweet.uuid === tweetEdit){
            return tweet
        }      
    })[0]
    
    tweetsData.splice(targetTweetObj, 1);
    render()
}

function handleModalTweetBtnClick(){
    console.log("clicked")
    document.getElementById('myModal').style.display = "inline"
    

}

function handleModalCloseClick(){
    document.getElementById('myModal').style.display = "none"
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>            
            </div>
        </div>
</div>
`
            })
        }
        
          
        feedHtml += `
<div class="tweet">
    <div id="tweet-inner" class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
         <i id="tweet-edit" class="fa-solid fa-trash"
         data-edit="${tweet.uuid}"></i>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div> 
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

