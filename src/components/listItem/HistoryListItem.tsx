import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatDistanceToNow } from "date-fns";

interface IProps {
  item: { courseCode: string; courseName: string; createdAt: string };
}

const HistoryListItem = ({
  item: { courseCode, courseName, createdAt },
}: IProps) => {
  return (
    <TouchableOpacity style={[styles.container, { alignItems: "center" }]}>
      <Text
        style={{
          color: "black",
          fontSize: 16,
          fontFamily: "Poppins-Bold",
        }}
      >
        {courseCode}
      </Text>
      <View style={{ marginLeft: "auto" }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 14,
          }}
        >
          Attendace Marked ✅
        </Text>
        <Text style={styles.date}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 10,
  },
  date: {
    marginLeft: "auto",
    color: "black",
    fontWeight: "200",
    fontSize: 12,
    marginTop: 3,
  },
});

export default HistoryListItem;
