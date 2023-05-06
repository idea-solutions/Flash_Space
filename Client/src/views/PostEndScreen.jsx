import { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { LocaleConfig, Calendar } from "react-native-calendars";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import theme from "../styles/theme";
import IpAddress from "../consts/variable";
import { InformationAddRoomContext } from "../context/InformationAddRoom";
import DeleteAddDay from "../components/DeleteAddDay";
const { width } = Dimensions.get("screen");

const PostEndScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [listSelected, setListSelected] = useState({});
  const [add, setAdd] = useState(false);
  const [timeSlot, setTimeSlot] = useState(false);
  const [listTimeslot, setListTimeSlot] = useState([]);
  const [listUserChoose, setListUserChoose] = useState([]);
  const [listDay, setListDay] = useState([]);
  const [listDayView, setListDayView] = useState([]);
  const [staticDelete, setStaticDelete] = useState(false);
  const [dayDeletee, setDayDelete] = useState("");
  const { informations } = useContext(InformationAddRoomContext);

  useEffect(() => {
    getListTimeSlot();
  }, []);
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    monthNamesShort: [
      "Thg.1",
      "Thg.2",
      "Thg.3",
      "Thg.4",
      "Thg.5",
      "Thg.6",
      "Thg.7",
      "Thg.8",
      "Thg.9",
      "Thg.10",
      "Thg.11",
      "Thg.12",
    ],
    dayNames: [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ],
    dayNamesShort: ["CN", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7"],
    today: "Hôm nay",
  };
  LocaleConfig.defaultLocale = "fr";

  const getListTimeSlot = async () => {
    await axios
      .get("http://" + IpAddress + ":8000/timeslot/")
      .then(async (response) => {
        const result = response.data;
        if (result != []) {
          setListTimeSlot(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InDay = () => {
    const toDay = new Date();
    return (
      <Calendar
        enableSwipeMonths={true}
        onDayPress={(day) => {
          setSelected(day.dateString);
          setTimeSlot(true);
        }}
        minDate={toDay}
        markedDates={listSelected}
        style={{
          borderRadius: 13,
          width: "100%",
          elevation: 10,
          paddingBottom: 10,
        }}
      />
    );
  };

  const CardGrid = ({ timeslot }) => {
    const checkList = listUserChoose.includes(timeslot);
    return (
      <View>
        {checkList ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={async () => {
              let arr = listUserChoose;
              if (arr.length != 0) {
                arr = arr.filter((item) => item !== timeslot);
                setListUserChoose(arr);
              }
            }}
          >
            <View
              style={{
                paddingTop: 30,
                width: width / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "85%",
                  backgroundColor: theme.PRIMARY_BG_COLOR,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderRadius: 8,
                  elevation: 6,
                }}
              >
                <Text>
                  {timeslot.starttime} - {timeslot.endtime}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <Pressable
            activeOpacity={0.8}
            onPress={() => {
              setListUserChoose([...listUserChoose, timeslot]);
            }}
          >
            <View
              style={{
                paddingTop: 30,
                width: width / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "85%",
                  backgroundColor: COLORS.gray,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderRadius: 8,
                  elevation: 6,
                }}
              >
                <Text>
                  {timeslot.starttime} - {timeslot.endtime}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
    );
  };
  const closeDelete = (result) => {
    setStaticDelete(result);
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {staticDelete ? (
        <DeleteAddDay closeDelete={closeDelete} day={dayDeletee} />
      ) : (
        <View />
      )}
      {add ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: COLORS.white,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "5%",
              paddingLeft: 20,
            }}
            onPress={async () => {
              await getListTimeSlot();
              setSelected("");
              setAdd(false);
              setTimeSlot(false);
            }}
          >
            <Text
              style={{
                fontFamily: theme.FontMain,
                fontSize: 19,
                color: theme.PRIMARY_BG_COLOR,
              }}
            >
              Trở lại
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "90%",
              height: "85%",
              justifyContent: "center",
            }}
          >
            <InDay />
          </View>

          {timeSlot ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 3000,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "10%",
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
                onPress={() => {
                  setListUserChoose([]);
                  setTimeSlot(false);
                  setSelected("");
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.FontMain,
                    fontSize: 19,
                    color: theme.PRIMARY_BG_COLOR,
                  }}
                >
                  Trở lại
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <FlatList
                  key={"_"}
                  showsHorizontalScrollIndicator={false}
                  data={listTimeslot}
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    width: width,
                  }}
                  renderItem={({ item }) => <CardGrid timeslot={item} />}
                  keyExtractor={(item) => "_" + item.id}
                  numColumns={3}
                  scrollEnabled={false}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: "10%",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.PRIMARY_BG_COLOR,
                    borderTopLeftRadius: 13,
                    borderTopRightRadius: 13,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    const a = [...listDay];
                    for (let i = 0; i < listUserChoose.length; i++) {
                      a.push({
                        date: selected,
                        timeslot: listUserChoose[i]._id,
                      });
                    }
                    const b = JSON.stringify(listSelected);
                    const c = b.substring(0, b.length - 1);
                    if (c.length <= 1) {
                      const d =
                        c +
                        '"' +
                        selected +
                        '":{ ' +
                        '"disabled' +
                        '": true }}';
                      const e = JSON.parse(d);
                      setListSelected(e);
                    } else {
                      const d =
                        c +
                        ',"' +
                        selected +
                        '":{ ' +
                        '"disabled' +
                        '": true }}';
                      const e = JSON.parse(d);
                      setListSelected(e);
                    }
                    setListDayView([...listDayView, { day: selected }]);
                    setListDay(a);
                    setTimeSlot(false);
                    setAdd(false);
                    setListUserChoose([]);
                    setSelected("");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: theme.FontMain,
                      fontSize: 19,
                      color: COLORS.white,
                    }}
                  >
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      ) : (
        <View>
          {timeSlot ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 3000,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "10%",
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
                onPress={() => {
                  setListUserChoose([]);
                  setTimeSlot(false);
                  setSelected("");
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.FontMain,
                    fontSize: 19,
                    color: theme.PRIMARY_BG_COLOR,
                  }}
                >
                  Trở lại
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <FlatList
                  key={"_"}
                  showsHorizontalScrollIndicator={false}
                  data={listTimeslot}
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    width: width,
                  }}
                  renderItem={({ item }) => <CardGrid timeslot={item} />}
                  keyExtractor={(item) => "_" + item.id}
                  numColumns={3}
                  scrollEnabled={false}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: "10%",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.PRIMARY_BG_COLOR,
                    borderTopLeftRadius: 13,
                    borderTopRightRadius: 13,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    const listNewDay = listDay.filter(
                      (item) => item.date != selected
                    );
                    const a = listNewDay;
                    for (let i = 0; i < listUserChoose.length; i++) {
                      a.push({
                        date: selected,
                        timeslot: listUserChoose[i],
                      });
                    }
                    const b = JSON.stringify(listSelected);
                    const c = b.substring(0, b.length - 1);
                    if (c.length <= 1) {
                      const d =
                        c +
                        '"' +
                        selected +
                        '":{ ' +
                        '"disabled' +
                        '": true }}';
                      const e = JSON.parse(d);
                      setListSelected(e);
                    } else {
                      const d =
                        c +
                        ',"' +
                        selected +
                        '":{ ' +
                        '"disabled' +
                        '": true }}';
                      const e = JSON.parse(d);
                      setListSelected(e);
                    }
                    setListDay(a);
                    setTimeSlot(false);
                    setAdd(false);
                    setListUserChoose([]);
                    setSelected("");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: theme.FontMain,
                      fontSize: 19,
                      color: COLORS.white,
                    }}
                  >
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
          <View
            style={{
              width: "100%",
              height: "90%",
              backgroundColor: COLORS.light,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.FontMain,
                    fontSize: 17,
                    color: COLORS.dark,
                  }}
                >
                  Bước 2: Chọn thời gian cho thuê
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    height: "40%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: theme.PRIMARY_BG_COLOR,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={navigation.goBack}
                  >
                    <Text style={{ color: "white" }}>1</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 90,
                      height: 7,
                      backgroundColor: theme.PRIMARY_BG_COLOR,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: theme.PRIMARY_BG_COLOR,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>2</Text>
                  </View>
                  <View
                    style={{
                      width: 90,
                      height: 7,
                      backgroundColor: COLORS.grey,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: COLORS.grey,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "black" }}>3</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  paddingVertical: 15,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    borderRadius: 13,
                    backgroundColor: COLORS.white,
                    marginVertical: 10,
                    elevation: 10,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: theme.FontMain,
                        fontSize: 16,
                        paddingLeft: 20,
                        color: COLORS.grey,
                      }}
                    >
                      Ngày
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: 15,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => setAdd(true)}
                        >
                          <View
                            style={{
                              width: "85%",
                              height: "85%",
                              borderRadius: 13,
                              backgroundColor: COLORS.light,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Icon name="add" size={30} color={COLORS.grey} />
                          </View>
                        </TouchableOpacity>
                        <FlatList />
                        {listDayView.map((element) => {
                          return (
                            <TouchableOpacity
                              style={{
                                width: "100%",
                                height: 80,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => {
                                const listChooseDay = listDay.filter(
                                  (item) => item.date == element.day
                                );

                                const listChooseDayUsed = [];
                                listChooseDay.map((item) => {
                                  listChooseDayUsed.push(item.timeslot);
                                });
                                setListUserChoose(listChooseDayUsed);
                                setSelected(element.day);
                                setTimeSlot(true);
                              }}
                              onLongPress={() => {
                                setStaticDelete(true);
                                setDayDelete(element.day);
                              }}
                            >
                              <View
                                style={{
                                  width: "85%",
                                  height: "85%",
                                  borderRadius: 13,
                                  backgroundColor: COLORS.light,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.day}</Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "10%",
              backgroundColor: theme.PRIMARY_BG_COLOR,
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              console.log(listDay);
              Object.assign(informations, { listwork: listDay });
              navigation.navigate("PostImageScreen");
            }}
          >
            <Text
              style={{
                fontFamily: theme.FontMain,
                fontSize: 19,
                color: COLORS.white,
              }}
            >
              Tiếp
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PostEndScreen;
