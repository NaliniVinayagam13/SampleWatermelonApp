import { Q } from "@nozbe/watermelondb"
import { database } from "../database"
import Post from "../models/post"

export const addPost = async (title: string, content: string) => {
    const postsCollection = database.get<Post>('posts')
    const existingPosts = await postsCollection.query().fetch();
    const maxPostId = existingPosts.reduce((max, post) => Math.max(max, post.posts_id), 0);
    const newPostId = maxPostId + 1;

    await database.write(async () => {
        await database.get<Post>('posts').create((post: Post) => {
            post.posts_id = newPostId
            post.title = title
            post.content = content
        })
    })
}

export const fetchPosts = async () => {
    const postsCollection = database.get('posts');
    const modelPosts = await postsCollection.query().fetch();
    const posts = modelPosts.map(data => data as Post);
    return posts;
}

export const updatePost = async (postId: number, newTitle: string, newContent: string) => {
    await database.write(async () => {
        const postsCollection = database.get<Post>('posts')
        const results = await postsCollection.query().fetch()
        console.log('updatePost -- results: ', results as Post[]);
        const post = await postsCollection.query(Q.where('posts_id', postId)).fetch();
        console.log('MatchedPost -- post: ', post as Post[]);
        if (!post) {
            console.warn(`Post with post_id ${postId} not found.`);
            return
        }

        if (post.length > 0) {
            await post[0].update((record) => {
                record.title = newTitle
                record.content = newContent
            })
            console.log('Post updated')
        } else {
            console.log('Post not found')
        }
    })
}

export const deletePost = async (postId: number) => {
    await database.write(async () => {
        const postsCollection = database.get<Post>('posts')
        const results = await postsCollection.query().fetch()
        console.log('deletePost -- results: ', results as Post[]);
        const post = await postsCollection.query(Q.where('posts_id', postId)).fetch();
        console.log('deletePost -- post: ', post as Post[]);
        if (!post) {
            console.warn(`Post with post_id ${postId} not found.`);
            return
        }

        if (post.length > 0) {
            const deletPost = post[0];
            await deletPost.markAsDeleted() //for soft delete
            // await deletPost.destroyPermanently(); 

            //For Batch Deletion
            // const allPosts = await postsCollection.query().fetch();
            // const deletions = allPosts.map(post => post.prepareDestroyPermanently());
            // await database.batch(...deletions);
            console.log('Post Deleted')
        } else {
            console.log('Post not found')
        }
    })
}

