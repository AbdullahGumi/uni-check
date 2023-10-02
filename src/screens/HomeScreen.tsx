import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLayoutEffect, useEffect, useState } from "react";

import CustomText from "../components/common/CustomText";
import HistoryListItem from "../components/listItem/HistoryListItem";

import { globalStyles } from "../styles";
import { QRCodeIcon } from "../../assets/svg";
import { getStudentInfoAPI, IStudentInfo } from "../api/userApi";
import { setStudentInfo } from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux";
import { RootStackScreenProps } from "../navigation/types";

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const dispatch = useAppDispatch();
  const studentInfo = useAppSelector(({ student }) => student);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getStudentInfoAPI()
      .then((res) =>
        dispatch(
          setStudentInfo({
            email: res.email,
            fullName: res.fullName,
            lectures: res.lectures,
            phoneNumber: res.phoneNumber,
            registrationNumber: res.registrationNumber,
            loaded: true,
            loading: false,
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={globalStyles.SafeArea}>
      <View style={globalStyles.container}>
        <View style={{ alignItems: "center", marginTop: "auto" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("QRScan")}
            activeOpacity={0.9}
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#bdbdbd",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <QRCodeIcon />
          </TouchableOpacity>
          <CustomText
            style={{
              fontSize: 30,
              fontFamily: "Poppins-Medium",
              marginTop: 20,
            }}
          >
            Check In
          </CustomText>
        </View>
        <View
          style={{
            alignSelf: "flex-start",
            marginTop: "auto",
            height: "50%",
          }}
        >
          <TouchableOpacity>
            <CustomText
              style={{
                color: "black",
                fontFamily: "Poppins-Medium",
                marginBottom: 5,
              }}
            >
              History
            </CustomText>
          </TouchableOpacity>
          <FlatList
            data={studentInfo.lectures}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => <HistoryListItem item={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
