import { StyleSheet, Modal, ActivityIndicator, View } from "react-native";

interface IProps {
  loading: boolean;
}

const ActivityModal = ({ loading }: IProps) => {
  return (
    <Modal transparent={true} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={[styles.activityIndicatorWrapper]}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    height: 80,
    width: 80,
    borderRadius: 15,
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default ActivityModal;
