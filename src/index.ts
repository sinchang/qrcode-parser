import b64toBlob from "./b64toBlob";
import { blob2text, isBase64, isUrl } from "./utils";

export type Input = string | Blob;

export default async (input: Input): Promise<string> => {
  let blob: Blob;

  if (
    input instanceof File &&
    Object.prototype.toString.call(input) === "[object File]"
  ) {
    blob = input.slice();
    return blob2text(blob);
  } else if (typeof input === "string" && isBase64(input)) {
    blob = b64toBlob(input);
    return blob2text(blob);
  } else if (typeof input === "string" && isUrl(input)) {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", input);
      xhr.responseType = "blob"; // force the HTTP response, response-type header to be blob
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          blob = xhr.response; // xhr.response is now a blob object
          blob2text(blob)
            .then((ret) => resolve(ret))
            .catch((e) => reject(e));
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  } else {
    return Promise.reject("The input type is invalid");
  }
};
