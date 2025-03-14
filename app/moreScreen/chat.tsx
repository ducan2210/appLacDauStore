import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {io} from 'socket.io-client';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import {getMessage, sendMessages} from '@/hooks/api/useMessage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';

interface Message {
  message_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const socket = io('http://localhost:3000'); // Thay bằng URL backend của bạn

const UserChatScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.user);
  const receiverId = 1;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null); // Ref để điều khiển cuộn

  if (!user?.user_id) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải thông tin người dùng...</Text>
      </SafeAreaView>
    );
  }

  // Kết nối Socket.IO
  useEffect(() => {
    if (!user.user_id) return;

    socket.emit('join', user.user_id);
    console.log('✅ User joined room:', user.user_id);

    const handleReceiveMessage = (msg: Message) => {
      console.log('📩 Tin nhắn mới:', msg);
      setMessages(prev => [...prev, msg]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [user.user_id]);

  // Lấy lịch sử tin nhắn từ API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessage(user.user_id);
        setMessages(response.data);
      } catch (error) {
        console.error('Lỗi lấy tin nhắn:', error);
      }
    };

    fetchMessages();
  }, [user.user_id]);

  // Cuộn xuống tin nhắn mới nhất khi nội dung thay đổi
  const handleContentSizeChange = (
    contentWidth: number,
    contentHeight: number,
  ) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: contentHeight, // Cuộn tới cuối nội dung
        animated: true,
      });
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!message.trim()) return;

    const msg = {
      message_id: Date.now(),
      sender_id: user.user_id,
      receiver_id: receiverId,
      content: message,
      created_at: new Date(),
      updated_at: new Date(),
    };

    socket.emit('sendMessage', msg);
    try {
      await sendMessages(user.user_id, message);
      setMessages(prev => [...prev, msg]);
    } catch (error) {
      console.error('Lỗi gửi tin nhắn:', error);
    }
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <BtnBackScreen />
          <Text style={styles.headerTitle}>Chat với Shop</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={hp(10)}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.message_id.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageBubble,
                item.sender_id === user.user_id
                  ? styles.sentBubble
                  : styles.receivedBubble,
              ]}>
              <Text style={styles.messageText}>{item.content}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={handleContentSizeChange} // Cuộn khi kích thước thay đổi
          initialNumToRender={10} // Tối ưu hiệu suất
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: wp(3),
    flex: 1,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: wp(3),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
  },
  loadingText: {
    fontSize: hp(2),
    color: '#333',
  },
  messageList: {
    padding: wp(4),
    paddingBottom: hp(2),
  },
  messageBubble: {
    maxWidth: wp(70),
    padding: wp(3),
    borderRadius: 15,
    marginVertical: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9ECEF',
  },
  messageText: {
    fontSize: hp(2),
    color: '#333',
  },
  timestamp: {
    fontSize: hp(1.5),
    color: '#777',
    alignSelf: 'flex-end',
    marginTop: hp(0.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 25,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: hp(2),
    backgroundColor: '#F9FAFB',
    marginRight: wp(2),
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: hp(2),
    fontWeight: '600',
  },
});

export default UserChatScreen;
