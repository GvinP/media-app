import {Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import styles from './styles';

const FeedPost = () => {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>blinchikbatonov</Text>
        <Entypo name="dots-three-horizontal" style={styles.threeDots} />
      </View>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={false ? 'heart' : 'hearto'}
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>username</Text> and{' '}
          <Text style={styles.bold}>66 others</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>username</Text> Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos
          fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti
          architecto, omnis, amet unde dignissimos quam minima?
        </Text>
        <Text>View all 16 comments</Text>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            <Text style={styles.bold}>username</Text> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </Text>
          <AntDesign
            name={false ? 'heart' : 'hearto'}
            size={14}
            style={styles.icon}
            color={colors.black}
          />
        </View>
        <Text>24 March, 2023</Text>
      </View>
    </View>
  );
};

export default FeedPost;
