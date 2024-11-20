import { View, StyleSheet, Text, ActivityIndicator, Image, FlatList } from "react-native";
import { getPostById, getUserId, getCommentsByPostId } from "../utils/api"; 
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const PostDetail = ({ route }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false); 
    const { id, userId } = route.params;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postById = await getPostById(id);
                setPostTitle(postById.title);
                setPostBody(postById.body);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const userData = await getUserId(userId);
                    setUsername(userData.name);
                } catch (error) {
                    console.error('Error fetching user:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            console.log('User ID is not available');
            setLoading(false);
        }
    }, [userId]);

    const fetchComments = async () => {
        try {
            const commentsData = await getCommentsByPostId(id);
            setComments(commentsData);
            setShowComments(true);
        } catch (error) {
            console.log('Error fetching comments', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0073b1" />
            </View>
        );
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: `https://ui-avatars.com/api/?name=${username}&background=random` }}
                    style={styles.profileImage}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.timestamp}>1 hour ago</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{postTitle}</Text>
                <Text style={styles.body}>{postBody}</Text>
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="thumbs-up" size={20} color="#0073b1" />
                    <Text style={styles.iconText}>Like</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="comment" size={20} color="#0073b1" onPress={fetchComments} />
                    <Text style={styles.iconText}>Comment</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="share" size={20} color="#0073b1" />
                    <Text style={styles.iconText}>Share</Text>
                </View>
            </View>

            {showComments && (
                <View style={styles.commentsContainer}>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.commentContainer}>
                                <View style={styles.commentHeader}>
                                    <Image
                                        source={{ uri: `https://ui-avatars.com/api/?name=${item.name}&background=random` }}
                                        style={styles.commentProfileImage}
                                    />
                                    <View style={styles.commentTextContainer}>
                                        <Text style={styles.commentUser}>{item.name}</Text>
                                        <Text style={styles.commentEmail}>{item.email}</Text>
                                    </View>
                                </View>
                                <Text style={styles.commentBody}>{item.body}</Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    headerTextContainer: {
        justifyContent: 'center',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    timestamp: {
        fontSize: 12,
        color: '#777',
    },
    contentContainer: {
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 14,
        color: '#0073b1',
        marginLeft: 5,
    },
    commentsContainer: {
        marginTop: 15,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    commentContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    commentProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentTextContainer: {
        justifyContent: 'center',
    },
    commentUser: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    commentEmail: {
        fontSize: 12,
        color: '#555',
    },
    commentBody: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default PostDetail;
