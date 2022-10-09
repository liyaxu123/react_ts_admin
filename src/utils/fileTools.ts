import SparkMD5 from "spark-md5";

// 把文件转换为BASE64
export function fileToBASE64(file: Blob) {
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    // 通过FileReader将文件转为BASE64
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev: any) => {
      // console.log(ev.target.result);
      resolve(ev.target.result);
    };
  });
}

interface Ifile2Hash {
  buffer: ArrayBuffer;
  HASH: string;
  suffix: string;
  filename: string;
}

// 把文件转为 buffer，并使用 MD5 获取文件的 HASH
export function fileToHash(file: any): Promise<Ifile2Hash> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    // 将文件转为 buffer 对象
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (ev) => {
      let buffer = ev.target?.result as ArrayBuffer,
        spark = new SparkMD5.ArrayBuffer(),
        // 文件hash
        HASH,
        // 文件后缀
        suffix;

      // 根据文件计算HASH，只要文件内容相同，HSAH就一样
      spark.append(buffer);
      HASH = spark.end();
      // 获取文件后缀
      suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)![1];

      resolve({
        buffer,
        HASH,
        suffix,
        filename: `${HASH}.${suffix}`,
      });
    };
  });
}
