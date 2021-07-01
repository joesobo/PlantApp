import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const width = Dimensions.get("window").width; //full width

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

    console.log(result);

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
              {!image && <Feather name="image" size={22} style={icon} />}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 150, height: 150, borderRadius: 8 }}
                />
              )}
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
              style={input}
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#858585"
              placeholder="Description..."
            />
          </View>
          <View style={column}>
            <View style={row}>
              <Text style={commandText}>Set Increment</Text>
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
                });
                schedulePushNotification((currentDate - Date.now()) / 1000);
                initialState();
                setVisible(false);
              }}
            >
              <Text style={buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 24,
  },
  modal: {
    borderWidth: 0,
    borderColor: "transparent",
    alignSelf: "stretch",
  },
  background: {
    backgroundColor: "#00000090",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#a1a1a1",
    borderBottomWidth: 1,
    paddingHorizontal: 28,
    paddingBottom: 24,
    paddingTop: 20,
    justifyContent: "space-around",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#52554F",
    paddingTop: 8,
    alignSelf: "stretch",
    textAlign: "center",
  },
  input: {
    height: 40,
    marginVertical: 8,
    padding: 4,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    color: "#656965",
    alignSelf: "stretch",
    width: "40%",
    borderRadius: 50,
  },
  commandText: {
    color: "#656965",
    minWidth: "55%",
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#a3cb70",
    borderRadius: 50,
    padding: 8,
    marginVertical: 8,
    flex: 1,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#52554F",
  },
  imageUpload: {
    backgroundColor: "#f2f2f2",
    width: 150,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadColumn: {
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "center",
    marginLeft: 8,
    marginBottom: 8,
    width: 150,
  },
  uploadButton: {
    borderColor: "#656965",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    padding: 4,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    color: "#656965",
  },
  uploadButtonText: {
    color: "#656965",
  },
});

export default PlantModal;
