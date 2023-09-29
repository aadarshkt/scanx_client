import { View } from "react-native";
import { Text } from "react-native-paper";

const HomeCard = ({ label, data }) => {
  return (
    <View>
      <Text>{label}</Text>
      <Text>{data}</Text>
    </View>
  );
};

export default HomeCard;
