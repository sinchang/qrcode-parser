import qrcodeParser from "../src";

const fileElement = document.getElementById("file");
fileElement.addEventListener(
  "change",
  (e) => {
    let files: FileList = <FileList>(<HTMLInputElement>e.target).files;
    qrcodeParser(files[0]).then((res) => {
      console.log(res);
      document.getElementById("content3").innerText = res;
    });
  },
  false
);

document.getElementById("parse-image-url").addEventListener(
  "click",
  () => {
    const url = (<HTMLInputElement>document.getElementById("image-url")).value;

    if (!url) return;

    qrcodeParser(url).then((res) => {
      document.getElementById("content1").innerText = res;
    });
  },
  false
);

document.getElementById("parse-image-base64").addEventListener(
  "click",
  () => {
    const url = (<HTMLInputElement>document.getElementById("image-base64"))
      .value;

    if (!url) return;

    qrcodeParser(url).then((res) => {
      document.getElementById("content2").innerText = res;
    });
  },
  false
);
