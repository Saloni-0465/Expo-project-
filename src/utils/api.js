const BASE_URL = "https://jsonplaceholder.typicode.com/"

export const getPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if(!response.ok){
        throw new Error("Failed to get posts")
    }
    const data = await response.json();
    return data
  }catch(error){
    console.log('Error fetching posts:',error);
    throw error;
  }
};


export const getPostById = async (id) => {
  try {
    if (!id) {
      throw new Error("Post ID is required");
    }

    const response = await fetch(`${BASE_URL}posts/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to get post with ID ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching post by ID:", error);
    throw error;
  }
};


export const getPostsByUserId = async(userId)=>{
    try{
        const response = await fetch(`${BASE_URL}users/${userId}/posts`);
        if(!response.ok){
            throw new Error('Could not fetch posts by userId')
        }
        const post = await response.json()
        return post 

    }
    catch(error){
        console.log('Error fetching posts by userId',error)
        throw error;

    }


}

export const getUsers = async()=>{
    try{
        const response = await fetch(`${BASE_URL}users`);
        if(!response.ok){
            throw new Error('Could not fetch users');
        }
        const data = await response.json()
        return data;

    }catch(error){
        console.log('Error fetching users',error);
        throw error;
    }
}

export const getUserId = async(id)=>{
    try{
        if(!id){
            throw new Error('User ID is required');
        }
        const response = await fetch(`${BASE_URL}users/${id}`); 
        if (!response.ok) {
            throw new Error(`Failed to get user with ID ${id}`);
          }
          const userData = await response.json();
          return userData;

    }catch(error){
        console.log(`Error fetching user data`,error);
        throw error;

    }
}

export const getCommentsByPostId = async(postId)=>{
    try{
        const response = await fetch(`${BASE_URL}posts/${postId}/comments`); 
        if(!response.ok){
            throw new Error('Failed to get comments by postID');
        }
        const comments = await response.json()
        return comments;

    }catch(error){
        console.log(`Error fetching comments`,error);
        throw error;
    }

}