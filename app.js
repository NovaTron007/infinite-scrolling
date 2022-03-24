// get domelementsf
const filterInput = document.querySelector("#filter")
const postsContainer = document.querySelector("#posts-container")
const loading = document.querySelector(".loading")

// set pagination for api
const limit = 3
let page = 1

// make call to api
const getPosts = async () => {
    // api result
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    // convert to json
    const data = res.json()
    // return postsf
    return data
}

// show posts: loop and display posts
const showPosts = async () => {
    // call getPosts
    const posts = await getPosts()

    // loop posts and keep adding to posts container
    posts.map((item, index) => {
        postsContainer.innerHTML += `<div class="post" id="post-${item.id}">
        <div class="number">${item.id}</div>
        <div class="post-info">
            <h2 class="post-title">${item.title}</h2>
            <p class="post-body">
            ${item.body}
            </p>
        </div>
    </div>`
    })
}

// add loading
const showLoading = () => {
    loading.classList.add("show")
    // remove class, increment page then show posts
    setTimeout(() => {
        loading.classList.remove("show")
        setTimeout(() => {
            page++
            showPosts()
        }, 300);
    }, 400);
}

// filter posts
const filterPosts = (e) => {
    // filter input uppercase for consistancy
    const term = e.target.value.toUpperCase()
    // get frontend data on dom 
    const postsDom = document.querySelectorAll(".post")
    // loop and get each postsDom
    postsDom.forEach((item) => {
        const title = item.querySelector(".post-title").innerText.toUpperCase() // uppercase for consistancy
        const body = item.querySelector(".post-body").innerText.toUpperCase()
        // no match returns -1: if not -1 then show otherwise hide the current post where title or body contain term
        if(title.indexOf(term) !== -1 || body.indexOf(term) !== - 1){
            console.log("match")
            item.style.display = "flex"
        } else {
            console.log("no match")
            item.style.display = "none"
        }
    })

}

// call showPosts
showPosts()

// scroll to positiona and load more posts
window.addEventListener("scroll", () => {
    // destructure from: document.documentElement.scrollTop 
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // set position to call showPosts
    if(scrollTop + clientHeight >= scrollHeight - 5) {
        // showloader
        showLoading()
    }

    // scrollTop: distance of scrollbar from the top of document
    // clientHeight: what's visible on screen 
    // scrollHeight: total height of document including hidden content overflowed and not shown until scrolled
})

// filter input: call filterPosts to filter dom posts
filterInput.addEventListener("input", filterPosts)