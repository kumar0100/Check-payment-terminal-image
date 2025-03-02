/* Local dependencies */
import * as fs from "fs"

const getArrayOfImages = async (parameter: string): Promise<string[]> => {
  let images: string[] = []

  try {
    if (parameter === 'images-of-terminal') {
      images = await fs.promises.readdir(`src/images/${parameter}`)
      
      
    } else if (parameter === "images-of-nonterminal") {
      images = await fs.promises.readdir(`src/images/${parameter}`)
    }

    return images
  } catch (error) {
    throw new Error(`Error getting images from folder: ${(error as Error).message}`)
  }
}

export default getArrayOfImages
