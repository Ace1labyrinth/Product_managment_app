import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
export default function HomeScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);

  const handleAddProduct = () => {
    if (!name || !price) return;

    if (products.length >= 5) {
      alert("You can only add up to 5 products")
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      image,
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
    setImage(null);
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
  <View style={{ padding: 20, flex: 1 }}>
      
      <Text style={{ fontSize: 24, marginBottom: 10, color: "black" }}>
        Add Product
      </Text>

      <TextInput
        placeholder="Product Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          color: "black",
          backgroundColor: "white"
        }}
      />

      <TextInput
        placeholder="Price"
        placeholderTextColor="gray"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
          color: "black",
          backgroundColor: "white"
        }}
      />
      <TouchableOpacity
  onPress={pickImage}
  style={{
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center"
  }}
>
  <Text>{image ? "Change Image" : "Pick Image"}</Text>
</TouchableOpacity>

{image && (
  <Image
    source={{ uri: image }}
    style={{ width: "100%", height: 150, marginBottom: 15, borderRadius: 10 }}
  />
)}

      <Button title="Add Product" onPress={handleAddProduct} />

      <Text style={{ marginTop: 30, fontSize: 20, color: "black", fontWeight: "bold" }}>
        Product List
      </Text>

      <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 20 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: "#f5f5f5",
            padding: 15,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 120, borderRadius: 10 }}
            />
          )}

          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
            {item.name}
          </Text>

          <Text style={{ color: "gray" }}>₦{item.price}</Text>
        </View>
      )}
    />

    </View>
    </SafeAreaView>
  );
}