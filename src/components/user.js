import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import classname from 'twrnc';
import { getPostsByUserId } from '../utils/api';

const UserProfile = ({ route }) => {
  const { user } = route.params;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      try {
        const posts = await getPostsByUserId(user.id);
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts by userId:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByUser();
  }, [user.id]);

  return (
    <ScrollView style={classname`flex-1 bg-gray-100`} contentContainerStyle={styles.container}>
      {/* User Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${user.name}&background=random` }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={classname`text-gray-500 text-sm mt-1`}>{user.company.name}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.infoText}>📧 Email: {user.email}</Text>
        <Text style={styles.infoText}>📱 Phone: {user.phone}</Text>
        <Text style={styles.infoText}>🌐 Website: {user.website}</Text>
      </View>

      {/* Address */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.infoText}>🏠 {user.address.suite}, {user.address.street}</Text>
        <Text style={styles.infoText}>📍 {user.address.city}, {user.address.zipcode}</Text>
      </View>

      {/* User's Posts */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Posts by {user.name}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody}>{item.body}</Text>
              </View>
            )}
            contentContainerStyle={styles.postsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
  postsSection: {
    marginTop: 20,
  },
  postsList: {
    paddingBottom: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserProfile;
