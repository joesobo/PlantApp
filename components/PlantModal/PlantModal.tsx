import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./PlantModal.styled";
import { LinearGradient } from "expo-linear-gradient";

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

const schedulePushNotification = async (time: number) => {
  if (Platform.OS !== "web") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey there! It's time to water your plant!",
        body: "{X} plant needs {Y} amount of water",
        // data: { data: "goes here" },
      },
      trigger: { seconds: time },
    });
  }
};

const PlantModal = (props: PropTypes) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dayIncrement, setDayIncrement] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [image, setImage] = useState<string>("");

  const { visible, setVisible, addTask } = props;
  const {
    modal,
    background,
    modalView,
    titleText,
    input,
    row,
    column,
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
  } = styles;

  const initialState = () => {
    setTitle("");
    setDescription("");
    setDayIncrement(0);
    setCurrentDate(Date.now());
  };

  const onDaysChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    let num = parseInt(text);
    if (isNaN(num) || num == undefined || num < 0) {
      num = 0;
    }
    if (num > 30) {
      num = 30;
    }
    setDayIncrement(num);
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

  return (
    <Modal style={modal} animationType="fade" visible={visible} transparent>
      <View style={background}>
        <View style={modalView}>
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
          <View style={column}>
            <View style={row}>
              <Text style={commandText}>Water Increment</Text>
              <TextInput
                style={input}
                value={dayIncrement.toString()}
                onChangeText={onDaysChanged}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>
          <View style={row}>
            <TouchableOpacity
              style={button}
              onPress={() => {
                addTask({
                  title,
                  description,
                  currentDate,
                  dayIncrement,
                  image
                });
                schedulePushNotification((currentDate - Date.now()) / 1000);
                initialState();
                setVisible(false);
              }}
            >
              <LinearGradient
                colors={["#a8d371b8", "#8ab652bb"]}
                start={[0, 0]}
                end={[1, 1]}
                style={gradientButton}
              >
                <Text style={buttonText}>Create</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={button}
              onPress={() => {
                addTask({
                  title,
                  description,
                  currentDate,
                  dayIncrement,
                });
                schedulePushNotification((currentDate - Date.now()) / 1000);
                initialState();
                setVisible(false);
              }}
            >
              <Text style={buttonText}>Create</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlantModal;
