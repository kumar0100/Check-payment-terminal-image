import { loadLayersModel, node, Tensor } from "@tensorflow/tfjs-node";

const loadImage = (image: Buffer): Tensor => {
  return node
    .decodeImage(image, 3)
    .resizeNearestNeighbor([128, 128])
    .expandDims(0)
    .toFloat();
};

export const verifyImage = async (image: Buffer): Promise<boolean> => {
  try {
    const model = await loadLayersModel(
      "file://./src/train-model/my-model/model.json"
    );

    const decodedImage = loadImage(image);
    console.log("Decoded image shape:", decodedImage.shape); // Проверяем размерность изображения

    const prediction = model.predict(decodedImage) as Tensor;
    const result = await prediction.data();

    console.log("Result of prediction:", result); // Логируем результат

    const isTerminal = result[0] > result[1]; // Ожидаем, что второй класс будет для термина

    console.log("Is terminal:", isTerminal); // Логируем результат классификации

    return isTerminal;
  } catch (error) {
    console.error("Error during prediction:", error);
    return false;
  }
};

export default verifyImage;
