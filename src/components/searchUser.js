import React,{useState} from 'react'
import {Text,View,TextInput} from 'react-native';

const searchUser = () => {
    const [data,setData] = useState([]);
    const searchUser = async()=>{
        const response = await getUsers();
        setData(response);
        console.log(response);
    }
  return (
    <View>
        <TextInput
        placeholder = "search"
        style ={{borderwidth: 1, borderColor: black}}
        onChangeText = {(text)=>searchUser(text)}/>
        {data.length?
        data.map((item)=><View style={{flexdirection:'row', justifyContent: 'space-between'}}>
            <Text>{item.name}</Text>
            <Text>{item.age}</Text>
            <Text>{item.email}</Text>
        </View>): null
        }
    </View>
  )
}

export default searchUser