const SERVER_URL = 'http://127.0.0.1:8000';

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
    }
    
async function insertPosts() {
    let posts =await getPosts();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend',
        `<div id='${post.id}'>
        <h1>글쓴이:${post.author}</h1>
         <h1 id='title'>${post.title}</h1>
         <p id='content'>${post.content}</p>
         <button onclick="deletePost(${post.id})">삭제</button>
         <div>`)
    });
};
insertPosts();

async function deletePost(id) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`,
    }
    });
    if(response.status ===204) {
        let post =document.getElementById(id);
        post.remove();
    }
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }