/* Local dependencies */
import fs from 'fs';
import path from 'path';
import verifyImage from "../index"

describe('Verify-image function', () => {
  test("It should return false if the image is unvalid", async () => {
    const nonTerminalImage = path.join(
      __dirname,
      "../test-images/non-terminal.jpg"
    );
    const imageBuffer = fs.readFileSync(nonTerminalImage);
    const result = await verifyImage(imageBuffer);

    expect(result).toBe(false);
  }, 15000);

  test('It should return true if the image is valid', async () => {
    const terminalImage = path.join(__dirname, "../test-images/terminal1.jpeg");
    const imageBuffer = fs.readFileSync(terminalImage)

    const result = await verifyImage(imageBuffer);

    expect(result).toBe(true)
  }, 15000)

  test("It should return true if the image is valid", async () => {
    const terminalImage = path.join(__dirname, "../test-images/terminal.jpg");
    const imageBuffer = fs.readFileSync(terminalImage);

    const result = await verifyImage(imageBuffer);

    expect(result).toBe(true);
  }, 15000);

  test("It should return false if the image is unvalid", async () => {
    const nonTerminalImage = path.join(
      __dirname,
      "../test-images/non-terminal1.jpg"
    );
    const imageBuffer = fs.readFileSync(nonTerminalImage);
    const result = await verifyImage(imageBuffer);

    expect(result).toBe(false);
  }, 15000);
})