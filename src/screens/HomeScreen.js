import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/Posts';
import { getPosts, getUsers, getUserId } from '../utils/api';

const HomeScreen = ({ navigation }) => {  // Add navigation prop here
  const [posts, setPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const onClickUser = async (id) => {
    try {
      const userData = await getUserId(id);
      navigation.navigate('UserProfile', { user: userData }); 
    } catch (error) {
      console.error('Error navigating to user profile:', error);
    }
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredUsers([]);
      return;
    }

    setLoadingUsers(true);

    try {
      const data = await getUsers();
      const filtered = data.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MyApp</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Icon name="heart-outline" size={28} color="#2c3e50" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="add-circle-outline" size={28} color="#2c3e50" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="person-circle-outline" size={28} color="#2c3e50" />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {searchQuery && (
        <View style={styles.searchResults}>
          {loadingUsers ? (
            <ActivityIndicator size="small" color="#3498db" />
          ) : filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onClickUser(item.id)} style={styles.userItem}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noUsersText}>No users found</Text>
          )}
        </View>
      )}

      {!searchQuery && (
        <>
          {loadingPosts ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.loadingText}>Loading posts...</Text>
            </View>
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <PostCard post={item} />}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 16,
    backgroundColor: '#fff',
  },
  searchResults: {
    marginHorizontal: 16,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  noUsersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
});

export default HomeScreen;
