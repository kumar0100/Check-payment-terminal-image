/* External dependencies */
import { load, MobileNet } from "@tensorflow-models/mobilenet";

export const loadMobileNetModel = async (): Promise<MobileNet> => {
  const model = await load();

  return model;
};
