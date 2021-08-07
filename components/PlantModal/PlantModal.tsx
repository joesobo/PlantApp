import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import * as Notifications from "expo-notifications";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./PlantModal.styled";
import { LinearGradient } from "expo-linear-gradient";
import { mainGradient, disabledButton } from "../../constants/colors";
import { MainContext } from "../../constants/context";
import {
  darkColor,
  waterColor,
  fertColor,
  white,
  light,
  dark,
} from "../../constants/colors";

type PropTypes = {
  visible: boolean;
  setVisible: Function;
  addTask: Function;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const schedulePushNotification = async (
  time: number,
  title: string,
  body?: string
) => {
  if (Platform.OS !== "web") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        // data: { data: "goes here" },
      },
      trigger: { seconds: time },
    });
  }
};

const PlantModal = (props: PropTypes) => {
  const { theme, isDark } = useContext(MainContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [useWater, setWater] = useState<boolean>(false);
  const [waterIncrement, setWaterIncrement] = useState<number>(0);
  const [useFert, setFert] = useState<boolean>(false);
  const [fertIncrement, setFertIncrement] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const { visible, setVisible, addTask } = props;
  const {
    modal,
    background,
    modalView,
    titleText,
    input,
    row,
    emptySpacing,
    commandText,
    button,
    icon,
    titleRow,
    buttonText,
    imageUpload,
    uploadColumn,
    uploadButton,
    uploadText,
    uploadButtonText,
    areaContainer,
    gradientButton,
    disabledText,
  } = styles(theme.colors);

  const initialState = () => {
    setTitle("");
    setDescription("");
    setWaterIncrement(0);
    setWater(false);
    setFertIncrement(0);
    setFert(false);
    setCurrentDate(Date.now());
    setImage("");
  };

  const onWaterChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    if (text == "") {
      setWaterIncrement(0);
    } else {
      let num = parseInt(text);
      setWaterIncrement(num);
    }
  };

  const onFertChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    if (text == "") {
      setFertIncrement(0);
    } else {
      let num = parseInt(text);
      setFertIncrement(num);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (image !== "" && title !== "") {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [image, title]);

  return (
    <Modal style={modal} animationType="fade" visible={visible} transparent>
      <View style={background}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={modalView}>
            {/* Title */}
            <View style={titleRow}>
              <Text style={titleText}>Plant Information</Text>
              <TouchableOpacity
                onPress={() => {
                  initialState();
                  setVisible(false);
                }}
              >
                <AntDesign name="close" size={22} style={icon} />
              </TouchableOpacity>
            </View>

            {/* Image */}
            <View style={row}>
              <TouchableOpacity onPress={pickImage}>
                <View style={imageUpload}>
                  <Text>
                    {!image && <Feather name="image" size={22} style={icon} />}
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 150, borderRadius: 8 }}
                      />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={uploadColumn}>
                <Text style={uploadText}>
                  Please upload a photo of your plant!
                </Text>
                <TouchableOpacity style={uploadButton} onPress={pickImage}>
                  <Text style={uploadButtonText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Date Upload */}
            <View style={row}>
              <Text style={commandText}>Title</Text>
              <TextInput
                style={input}
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#858585"
                placeholder="Title..."
              />
            </View>
            <View style={row}>
              <Text style={commandText}>Description</Text>
              <TextInput
                style={[input, areaContainer]}
                value={description}
                multiline={true}
                numberOfLines={3}
                onChangeText={setDescription}
                placeholderTextColor="#858585"
                placeholder="Description..."
              />
            </View>

            {/* Water */}
            <View style={row}>
              <Text style={commandText}>Water Increment</Text>
              <Switch
                {...Platform.select({
                  web: {
                    activeThumbColor: useWater
                      ? isDark
                        ? darkColor
                        : white
                      : waterColor,
                  },
                })}
                trackColor={{
                  false: isDark ? dark.barBackground : light.barBackground,
                  true: waterColor,
                }}
                thumbColor={
                  useWater ? (isDark ? darkColor : white) : waterColor
                }
                ios_backgroundColor={
                  useWater
                    ? waterColor
                    : isDark
                    ? dark.barBackground
                    : light.barBackground
                }
                onValueChange={() => setWater(!useWater)}
                value={useWater}
              />
              {useWater ? (
                <TextInput
                  style={input}
                  value={waterIncrement.toString()}
                  onChangeText={onWaterChanged}
                  keyboardType="numeric"
                  maxLength={2}
                />
              ) : (
                <View style={emptySpacing} />
              )}
            </View>

            {/* Fertilizer */}
            <View style={row}>
              <Text style={commandText}>Fertilizer Increment</Text>
              <Switch
                {...Platform.select({
                  web: {
                    activeThumbColor: useFert
                      ? isDark
                        ? darkColor
                        : white
                      : fertColor,
                  },
                })}
                trackColor={{
                  false: isDark ? dark.barBackground : light.barBackground,
                  true: fertColor,
                }}
                thumbColor={useFert ? (isDark ? darkColor : white) : fertColor}
                ios_backgroundColor={
                  useFert
                    ? fertColor
                    : isDark
                    ? dark.barBackground
                    : light.barBackground
                }
                onValueChange={() => setFert(!useFert)}
                value={useFert}
              />
              {useFert ? (
                <TextInput
                  style={input}
                  value={fertIncrement.toString()}
                  onChangeText={onFertChanged}
                  keyboardType="numeric"
                  maxLength={2}
                />
              ) : (
                <View style={emptySpacing} />
              )}
            </View>

            <View style={row}>
              <TouchableOpacity
                style={button}
                disabled={!isButtonEnabled}
                onPress={() => {
                  addTask({
                    title,
                    description,
                    currentDate,
                    waterIncrement,
                    fertIncrement,
                    image,
                  });
                  useWater
                    ? schedulePushNotification(
                        waterIncrement,
                        "Hey there! It's time to water your plant!"
                      )
                    : null;
                  useFert
                    ? schedulePushNotification(
                        fertIncrement,
                        "Hey there! It's time to fertilizer your plant!"
                      )
                    : null;
                  initialState();
                  setVisible(false);
                }}
              >
                <LinearGradient
                  colors={[
                    isButtonEnabled
                      ? mainGradient.start
                      : isDark
                      ? disabledButton.dark
                      : disabledButton.light,
                    isButtonEnabled
                      ? mainGradient.end
                      : isDark
                      ? disabledButton.dark
                      : disabledButton.light,
                  ]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={gradientButton}
                >
                  <Text style={[buttonText, !isButtonEnabled && disabledText]}>
                    Create
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default PlantModal;
