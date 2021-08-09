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
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./EditModal.styled";
import { LinearGradient } from "expo-linear-gradient";
import { mainGradient, disabledButton } from "../../constants/colors";
import { MainContext } from "../../constants/context";
import { Task } from "../../constants/types";

type PropTypes = {
  visible: boolean;
  setVisible: Function;
  updateTask: Function;
  task: Task;
};

const EditModal = (props: PropTypes) => {
  const { theme } = useContext(MainContext);
  const [title, setTitle] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [waterIncrement, setWaterIncrement] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const { visible, setVisible, updateTask, task } = props;

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
    disabledText,
  } = styles(theme.colors);

  const onWaterChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    if (text == "") {
      setWaterIncrement(0);
    } else {
      let num = parseInt(text);
      setWaterIncrement(num);
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
    const { title, description, waterIncrement, image, index } = task;
    setTitle(title);
    setDescription(description as string);
    setWaterIncrement(waterIncrement as number);
    setImage(image);
    setIndex(index);
  }, [task]);

  return (
    <Modal style={modal} animationType="fade" visible={visible} transparent>
      <View style={background}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={modalView}>
            <View style={titleRow}>
              <Text style={titleText}>Update Information</Text>
              <TouchableOpacity
                onPress={() => {
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
            <View style={column}>
              <View style={row}>
                <Text style={commandText}>Water Increment</Text>
                <TextInput
                  style={input}
                  value={waterIncrement.toString()}
                  onChangeText={onWaterChanged}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
            <View style={row}>
              <TouchableOpacity
                style={button}
                onPress={() => {
                  updateTask(
                    {
                      title: title,
                      description: description,
                      image: image,
                      waterIncrement: waterIncrement,
                    },
                    index
                  );
                  setVisible(false);
                }}
              >
                <LinearGradient
                  colors={[mainGradient.start, mainGradient.end]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={gradientButton}
                >
                  <Text style={buttonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EditModal;
