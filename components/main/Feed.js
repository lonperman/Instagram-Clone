import React, {useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

function Feed(props){
    
    const [posts, setPosts] = userState([]);

    useEffect(() => {
        if(props.usersFollowingLoaded == props.following.length && props.following.length !== 0){
            
        }
    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }

    const onUnFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    if(user === null){
        return <View />
    }

    return(
        <View styles={styles.container}>
            <View styles={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button
                                title="Following"
                                onPress={() => onUnfollow()}
                            />
                        ):
                        (
                            <Button 
                                title="Follow"
                                onPress={() => onFollow()}
                            />
                        )}
                    </View>
                ) : null}
            </View>

            <View style={styles.containerGallery}>
                <FlatList 
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image} 
                                source={{uri: item.downloadURL}}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo:{
        margin: 20
    },
    containerGallery:{
        flex: 1
    },
    containerImage:{
        flex: 1/3,
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile);