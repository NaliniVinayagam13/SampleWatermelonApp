import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, View, FlatList } from 'react-native'
import post from '../../models/post'
import { addPost, fetchPosts, updatePost, deletePost} from '../../actions/index.ts'

const Posts = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ posts, setPosts ] = useState<post[]>([]);

    useEffect(() => {
        const fetchPostsAsync = async () => {
            const fetchedPosts = await fetchPosts()
            setPosts(fetchedPosts);
        }
        fetchPostsAsync();
    }, [posts])

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Enter Post title: "
                value={title}
                onChangeText={setTitle}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Enter Content: "
                value={content}
                onChangeText={setContent}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <Button title="Add Task" onPress={() => addPost(title, content)} />
            <Button title="Update Task" onPress={() => updatePost(4, title, content)} />
            <Button title="Delete Task" onPress={() => deletePost(3)} />
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            Title: {item.title}
                        </Text>

                        <Text>
                            Content: {item.content}
                        </Text>
                    </View> 
                )}
                ListEmptyComponent={() => (
                    <Text>
                        No posts yet
                    </Text>
                )}
            />
        </View>
    )
}  
export default Posts