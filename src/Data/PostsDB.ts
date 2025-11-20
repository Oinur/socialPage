import { json } from "stream/consumers";
import { Post } from "./Types";



export const POST_KEY = 'posts';
export const REPOST_KEY = 'reposts';
export function setDate():string{
    let hours: string | number = new Date().getHours()
    if (hours < 10){
        hours = '0' + String(hours)
    }
    let minutes: string | number = new Date().getMinutes()
    if (minutes < 10){
        minutes = '0' + String(minutes)
    }
    return `${hours} : ${minutes}`
}

export function getPosts(src: string): Promise<Post[]>{
    let saved: Post[] | null = null;
    const stored = localStorage.getItem(POST_KEY)
    if (stored) {
        
        saved = JSON.parse(stored) as Post[]
        
        return Promise.resolve(saved)
    }
        
       return fetch(src)
            .then(result => result.json())
            .then((data) => {
                let newPost: Post[] = data.map((data : any) : Post => ({
                    id : data.id,
                    date : setDate(),
                    img : data.url,
                    whoLiked : [],
                    likes : Math.floor(Math.random() * (20000 - 5000) + 5000),
                    comments: {quantity : Math.floor(Math.random() * (100 - 50) + 50)},
                    reposts : {quantity : Math.floor(Math.random() * (100 - 50) + 50)},
                }))
                 localStorage.setItem(POST_KEY, JSON.stringify(newPost))
                 return newPost
            }
        ) 
        
}    
    
export async function loadMorePosts(src: string) {
  const savedData = localStorage.getItem(POST_KEY);
  const saved: Post[] = savedData ? JSON.parse(savedData) : [];

  const result = await fetch(src);
  const data = await result.json();

  const newPosts: Post[] = data.map((item: any) => ({
    id: item.id,
    date: setDate(),
    img: item.url,
    likes: Math.floor(Math.random() * (20000 - 5000) + 5000),
    liked : false,
    comments: {quantity : Math.floor(Math.random() * (100 - 50) + 50)},
    reposts : {quantity : Math.floor(Math.random() * (100 - 50) + 50)},
  }));

  const updated = [...saved, ...newPosts];
  localStorage.setItem(POST_KEY, JSON.stringify(updated));
  
  return updated;
}

export function setRepost(id : string){
    const storedReposts = JSON.parse(localStorage.getItem(REPOST_KEY) || '[]') as Post[];
    const posts = JSON.parse(localStorage.getItem(POST_KEY) || '[]') as Post[]
    const currentPost = posts.filter(item => item.id === id)
    console.log(currentPost)
    const updatedReposts = [...storedReposts, ...currentPost]
    console.log(updatedReposts)
    localStorage.setItem(REPOST_KEY, JSON.stringify(updatedReposts)) 
}
export function getRepost(){

}

export function openComments(id: string){
    


}


window.addEventListener('unload', () => {
    localStorage.removeItem(POST_KEY)
})

