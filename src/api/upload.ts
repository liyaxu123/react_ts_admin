import { request2 } from "@/utils/request";

interface IresData {
  code: 0 | 1;
  codeText: string;
  originalFilename: string;
  servicePath: string;
}

/**
 * @description: 单文件上传
 */
export const uploadSingle: (data: any) => any = (data) => {
  return request2({
    method: "post",
    url: "/upload_single",
    data,
  });
};

/**
 * @description: 单文件上传，BASE64
 */
export const uploadSingleBase64: (data: any) => any = (data) => {
  return request2({
    method: "post",
    url: "/upload_single_base64",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

/**
 * @description: 获取已经上传的切片
 */
export const getAlreadyUploadFileChunk = (data: any) => {
  return request2({
    method: "get",
    url: "/upload_already",
    params: data,
  });
};

/**
 * @description: 上传文件切片
 */
export const uploadFileSlice: (data: any) => any = (data) => {
  return request2({
    method: "post",
    url: "/upload_chunk",
    data,
  });
};

/**
 * @description: 合并文件切片
 */
export const mergeFileSlice: (data: any) => any = (data) => {
  return request2({
    method: "post",
    url: "/upload_merge",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
