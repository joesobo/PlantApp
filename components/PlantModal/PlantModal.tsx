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
  ScrollView,
} from "react-native";
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
import { schedulePushNotification } from "../../constants/notifications";
import NumericInput from "react-native-numeric-input";
import { Task } from "../../constants/types";

type PropTypes = {
  visible: boolean;
  setVisible: Function;
  addTask: Function;
  newIndex: number;
};

const PlantModal = (props: PropTypes) => {
  const { theme, isDark, useNotifications } = useContext(MainContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [useWater, setWater] = useState<boolean>(false);
  const [waterIncrement, setWaterIncrement] = useState<number>(0);
  const [useFert, setFert] = useState<boolean>(false);
  const [fertIncrement, setFertIncrement] = useState<number>(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const { visible, setVisible, addTask, newIndex } = props;
  const {
    modal,
    background,
    modalView,
    titleText,
    input,
    row,
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
    subCommandText,
    spaced,
  } = styles(theme.colors);

  const initialState = () => {
    setTitle("");
    setDescription("");
    setWaterIncrement(0);
    setWater(false);
    setFertIncrement(0);
    setFert(false);
    setImage("");
  };

  const onWaterChanged = (input: number) => {
    setWaterIncrement(input);
  };

  const onFertChanged = (input: number) => {
    setFertIncrement(input);
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

  const incrementToSeconds = (days: number) => {
    return days * 24 * 60 * 60;
  };

  const canNotifyForWater = () => {
    return useNotifications && useWater && waterIncrement !== 0;
  };

  const canNotifyForFert = () => {
    return useNotifications && useFert && fertIncrement !== 0;
  };

  const createTask = () => {
    const newTask: Task = {
      title,
      index: newIndex,
      description,
      waterIncrement,
      needWatering: useWater && waterIncrement !== 0,
      lastWaterTime: new Date(),
      fertIncrement,
      needFertilizer: useWater && waterIncrement !== 0,
      lastFertTime: new Date(),
      image,
    };
    addTask(newTask);
    canNotifyForWater()
      ? schedulePushNotification(
          incrementToSeconds(waterIncrement),
          "Hey there! It's time to water your plant!",
          newTask,
          true
        )
      : null;
    canNotifyForFert()
      ? schedulePushNotification(
          incrementToSeconds(fertIncrement),
          "Hey there! It's time to fertilizer your plant!",
          newTask,
          false
        )
      : null;
    initialState();
    setVisible(false);
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
          <ScrollView style={modalView}>
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

            {/* Text */}
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
              <Text style={commandText}>Water</Text>
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
            </View>
            {useWater ? (
              <View style={[row, spaced]}>
                <Text style={subCommandText}>Days between watering</Text>
                <NumericInput
                  totalHeight={35}
                  totalWidth={120}
                  rounded
                  textColor={isDark ? dark.descText : light.descText}
                  rightButtonBackgroundColor={
                    isDark ? dark.displayBackground : light.displayBackground
                  }
                  leftButtonBackgroundColor={
                    isDark ? dark.displayBackground : light.displayBackground
                  }
                  borderColor={isDark ? dark.border : light.border}
                  onChange={onWaterChanged}
                  value={waterIncrement}
                  minValue={0}
                  maxValue={100}
                />
              </View>
            ) : null}

            {/* Fertilizer */}
            <View style={[row, spaced]}>
              <Text style={commandText}>Fertilizer Timer</Text>
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
            </View>
            {useFert ? (
              <View style={[row, spaced]}>
                <Text style={subCommandText}>Days between fertilizer</Text>
                <NumericInput
                  totalHeight={35}
                  totalWidth={120}
                  rounded
                  textColor={isDark ? dark.descText : light.descText}
                  rightButtonBackgroundColor={
                    isDark ? dark.displayBackground : light.displayBackground
                  }
                  leftButtonBackgroundColor={
                    isDark ? dark.displayBackground : light.displayBackground
                  }
                  borderColor={isDark ? dark.border : light.border}
                  onChange={onFertChanged}
                  value={fertIncrement}
                  minValue={0}
                  maxValue={100}
                />
              </View>
            ) : null}

            {/* Create */}
            <View style={row}>
              <TouchableOpacity
                style={button}
                disabled={!isButtonEnabled}
                onPress={createTask}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default PlantModal;
