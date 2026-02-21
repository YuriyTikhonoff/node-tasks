import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filePath = join(__dirname, "..", "data_source.txt")
// we can try to check whether the file exists using
// try { await fs.access(filePath) } catch (err) { console.error("File not found") }

const OPERATION_SYSTEM_ERROR_CODE_FOR_NON_EXISTENT_FILE_OR_DIRECTORY = "ENOENT"
const ENCODING = "utf8"

console.log("Current directory:", __dirname)
console.log("Starting to read file...")

try {
  const data = fs.readFileSync(filePath, ENCODING)
  // it is the same as  fs.readFileSync("file.txt").toString(ENCODING)
  // cause by default, it returns a buffer,
  // so we need to convert it to string using toString() method or by passing "utf8" as the second argument.

  console.log("File reading completed.")
  const lines = data.split("\n").filter((line) => line.trim() !== "")
  console.log("Number of lines:", lines.length)
  console.log("First line:", lines[0])
} catch (err) {
  if (
    err.code === OPERATION_SYSTEM_ERROR_CODE_FOR_NON_EXISTENT_FILE_OR_DIRECTORY
  ) {
    console.error("File not found:", filePath)
  } else {
    console.error("Error reading file:", err)
    throw err
  }
}
