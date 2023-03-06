import { TouchableOpacity, View, Text } from "react-native";
import * as Haptics from "expo-haptics";
import { ArrowLeftIcon } from "../../../assets/svg";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  maxLength: number;
  withComma?: boolean;
  allowZeroAsFirstCharacter?: boolean;
}

const VirtualKeyboard = ({
  value,
  setValue,
  maxLength,
  allowZeroAsFirstCharacter,
}: IProps) => {
  const onKeyPress = (key: string) => {
    Haptics.selectionAsync();
    let currentText = value;
    if (key === "0" && allowZeroAsFirstCharacter) {
      currentText += key;
      setValue(currentText);
      return;
    }

    if ((value === "" && key === "0") || (value === "" && key === ",")) {
      return;
    }

    if (key !== "backIcon") {
      if (currentText.length <= maxLength) {
        currentText += key;
        setValue(currentText);
      }
    } else {
      currentText = currentText.slice(0, -1);
      setValue(currentText);
    }
  };

  const makeCell = (key: string, i: number) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => onKeyPress(key)}
        style={{
          justifyContent: "center",
          backgroundColor: key !== "" ? "#eee" : "transparent",
          borderRadius: key !== "" ? 50 : 0,
          width: 70,
          height: 70,
        }}
      >
        {key === "backIcon" ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowLeftIcon color="black" />
          </View>
        ) : (
          <Text
            style={{
              fontFamily: "Poppins-Semi-Bold",
              fontSize: 24,
              padding: 10,
              textAlign: "center",
            }}
          >
            {key}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  const makeRow = (keysInRow: Array<string>) => {
    const cells = keysInRow.map((val, i) => makeCell(val, i));
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {cells}
      </View>
    );
  };
  return (
    <View style={{ width: "100%" }}>
      {makeRow(["1", "2", "3"])}
      {makeRow(["4", "5", "6"])}
      {makeRow(["7", "8", "9"])}
      {makeRow(["", "0", "backIcon"])}
    </View>
  );
};

export default VirtualKeyboard;
