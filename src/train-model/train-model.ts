/* External dependencies */
import { layers, node, Rank, sequential, stack, Tensor, tensor2d } from "@tensorflow/tfjs-node";

/* Local dependencies */
import * as fs from 'fs'
import getArrayOfImages from './images';

const model = sequential()

model.add(layers.conv2d({
  inputShape: [128, 128, 3],
  filters: 16,
  kernelSize: 3,
  activation: 'relu'
}))
model.add(layers.maxPooling2d({
  poolSize: 2
}))
model.add(layers.conv2d({
  filters: 32,
  kernelSize: 3,
  activation: 'relu'
}))
model.add(layers.maxPooling2d({
  poolSize: 2
}))
model.add(layers.flatten())
model.add(layers.dense({
  units: 64,
  activation: 'relu'
}))
model.add(layers.dense({
  units: 2,
  activation: 'softmax'
}))
model.compile({
  loss: "categoricalCrossentropy",
  optimizer: 'adam',
  metrics: ['accuracy']
});

const loadImage = (path: string): Tensor<Rank> => {
  if (!fs.existsSync(path)) {
    throw new Error(`File not found: ${path}`);
  }

  const extentions = path.split('.').pop()?.toLowerCase()
  const allowedExtentions = ["jpg", "jpeg", "png", "bmp", "gif"];

  if (!allowedExtentions.includes(extentions || '')) {
    throw new Error(`Unsupported file format: ${extentions}`);
  }

  const imageBuffer = fs.readFileSync(path);
  return node
    .decodeImage(imageBuffer, 3)
    .resizeNearestNeighbor([128, 128])
    .toFloat()
    .div(255);
}

const trainModel = async (): Promise<void> => {
  try {
    const imagesOfTerminal = await getArrayOfImages('images-of-terminal')
    const imagesOfNonTerminal = await getArrayOfImages("images-of-nonterminal");

    console.log(imagesOfTerminal.length);
    console.log(imagesOfNonTerminal.length);

    const trainX = stack([
      ...imagesOfTerminal.map((value, index) =>
        loadImage(`src/images/images-of-terminal/${value}`)
      ),
      ...imagesOfNonTerminal.map((value, index) =>
        loadImage(`src/images/images-of-nonterminal/${value}`)
      ),
    ]);

    console.log(imagesOfTerminal.length);
    console.log(imagesOfNonTerminal.length);
    
    const trainY = tensor2d([
      ...imagesOfTerminal.map(() => [1, 0]), // Correct labels for terminal images
      ...imagesOfNonTerminal.map(() => [0, 1]), // Correct labels for non-terminal images
    ]);

    await model.fit(trainX, trainY, { epochs: 12 });
    await model.save("file://./src/train-model/my-model");
  
    console.log('Model has trained and saved!');
  } catch (error) {
    throw new Error(`Error training model: ${(error as Error).message}`);
  }
}

trainModel();
