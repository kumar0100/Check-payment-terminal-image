/* External dependencies */
import { load, ObjectDetection } from "@tensorflow-models/coco-ssd";

export const loadCocoModel = async (): Promise<ObjectDetection> => {
  const model = await load()

  return model
}
