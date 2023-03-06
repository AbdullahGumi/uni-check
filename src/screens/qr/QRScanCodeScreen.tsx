import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  BarCodeScanningResult,
  Camera,
  CameraType,
  PermissionResponse,
} from "expo-camera";
import Toast from "react-native-toast-message";

import { ArrowLeftIcon } from "../../../assets/svg";

import CustomText from "../../components/common/CustomText";
import { CommonScreenProps } from "../../navigation/types";
import { checkInStudentAPI } from "../../api/userApi";
import { isJsonString } from "../../util/StringUtil";
import { AxiosError } from "axios";

const QRScanCodeScreen = ({ navigation }: CommonScreenProps<"QRScan">) => {
  const [cameraPermission, setCameraPermission] =
    useState<PermissionResponse>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(permission);
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Scan Qr Code",
      headerTitle: () => (
        <CustomText style={{ color: "white" }}>Scan Qr Code</CustomText>
      ),
      headerBackVisible: false,
      headerTransparent: true,
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 20 }}
        >
          <ArrowLeftIcon color="#A6A6A6" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const onBarCodeScanned = async (code: BarCodeScanningResult) => {
    if (scanned) return;
    if (!isJsonString(code.data)) {
      Toast.show({
        text1: "Invalid lecture code",
        type: "error",
      });
      return;
    }

    const data = JSON.parse(code.data);
    if (!data.lectureId) {
      Toast.show({
        text1: "Invalid lecture code",
        type: "error",
      });
      return;
    }

    try {
      setScanned(true);
      const res = await checkInStudentAPI({ lectureId: data.lectureId });
      if (res) {
        Toast.show({ text1: res, type: "success" });
        navigation.goBack();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        navigation.goBack();
        Toast.show({
          text1: err.response?.data as string,
          type: "error",
        });
      }
    }
  };

  const renderEdge = (
    edgePosition: "bottomRight" | "bottomLeft" | "topRight" | "topLeft"
  ) => {
    return (
      <View
        style={[
          styles.edge,
          {
            borderLeftWidth:
              edgePosition === "topLeft" || edgePosition === "bottomLeft"
                ? 3.5
                : 0,
            borderTopWidth: edgePosition.includes("top") ? 3.5 : 0,
            borderBottomWidth: edgePosition.includes("bottom") ? 3.5 : 0,
            borderRightWidth:
              edgePosition === "topRight" || edgePosition === "bottomRight"
                ? 3.5
                : 0,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.cameraContainer}>
      {/* TODO fix camera not shuting down after closing screen on IOS*/}
      {cameraPermission?.granted && (
        <Camera
          style={styles.camera}
          type={CameraType.back}
          onBarCodeScanned={(code) => onBarCodeScanned(code)}
        >
          <View style={styles.container1} />
          <View style={styles.container2}>
            <View style={styles.scannerSide} />
            <View style={styles.scanner}>
              <View style={styles.edgeRow}>
                {renderEdge("topLeft")}
                {renderEdge("topRight")}
              </View>
              <View
                style={[
                  styles.edgeRow,
                  {
                    marginTop: "auto",
                  },
                ]}
              >
                {renderEdge("bottomLeft")}
                {renderEdge("bottomRight")}
              </View>
            </View>
            <View style={styles.scannerSide} />
          </View>

          <View style={styles.container3}></View>
        </Camera>
      )}
    </View>
  );
};

export default QRScanCodeScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  camera: { width: "100%", height: "100%" },
  container1: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  scanner: {
    backgroundColor: "transparent",
    width: 300,
    height: "100%",
  },
  edgeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  edge: {
    width: 20,
    height: 20,
    borderColor: "#D9D9D9",
    borderRadius: 2.5,
  },
  scannerSide: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "10%",
    flex: 1,
    zIndex: -2,
  },
  container3: {
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontFamily: "Euclid-Circular-A-Medium",
    fontSize: 14,
  },
  button: {
    marginTop: 100,
    marginBottom: "auto",
    backgroundColor: "#E7E9EA",
  },
});
