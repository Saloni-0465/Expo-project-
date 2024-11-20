import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import classname from 'twrnc';
import { getUserId } from '/Users/salonisharma/secondExpoProject/src/utils/api.js';

const PostCard = ({ post }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserId(post.userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [post.userId]);

    return (
        <View style={styles.card}>
            {loading ? (
                <ActivityIndicator size="small" color="#3498db" style={styles.loader} />
            ) : (
                user && (
                    <TouchableOpacity
                        style={styles.userInfo}
                        onPress={() => navigation.navigate('UserProfile', { user })}
                    >
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userCompany}>{user.company.name}</Text>
                    </TouchableOpacity>
                )
            )}

            <Text style={styles.postTitle}>{post.title}</Text>

            <TouchableOpacity
                style={styles.moreInfoButton}
                onPress={() => navigation.navigate('post', { id: post.id, userId: post.userId })}
            >
                <Text style={styles.moreInfoText}>Get more info</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    loader: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    userInfo: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    userCompany: {
        fontSize: 14,
        color: '#95a5a6',
    },
    postTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#34495e',
        marginBottom: 12,
    },
    moreInfoButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    moreInfoText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
    },
});

export default PostCard;
