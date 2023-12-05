import fs from "fs"
import path from "path"

export async function readJSONFile(filename) {
  try {
    const filePath = path.resolve("assets",filename)
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const jsonContent = JSON.parse(jsonData);
    return jsonContent;
  } catch (error) {
    console.error(error);
    return null;
  }
}

