import React, { useState } from "react";
import { Card, Tag, Divider, Upload, Button, message, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import {
  getAlreadyUploadFileChunk,
  uploadFileSlice,
  mergeFileSlice,
} from "@/api/upload";
import { fileToHash } from "@/utils/fileTools";

export default function LargeFile() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  // 进度条数据
  let [percent, setPercent] = useState(0);

  // 上传组件的配置参数
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // console.log("beforeUpload：", file);
      // 保存选中的文件
      setFileList([file]);
      return false;
    },
    // 处理文件上传
    onChange: async ({ file }) => {
      if (!file) {
        message.error("请您先选择要上传的文件~~");
        return;
      }

      // 开启loading
      setUploading(true);

      // 获取文件HASH
      const { HASH, suffix } = await fileToHash(file);
      let alreadyUploadChunks = [] as string[];

      try {
        // 获取已上传的切片信息
        const res = (await getAlreadyUploadFileChunk({ HASH })) as any;
        if (res.code === 0) {
          // 保存已上传的切片信息
          alreadyUploadChunks = res.fileList;
        }
      } catch (error) {
        console.log(error);
      }

      // 实现文件切片处理 「固定数量 & 固定大小」
      let max = 1024 * 100, // 规定文件切片最大 100kb
        count = Math.ceil(file.size! / max), // 计算文件的切片数量
        index = 0, // 定义索引
        chunks = [];
      // 如果切片数量大于100，按照固定大小(100个)来切片
      if (count > 100) {
        count = 100;
        max = file.size! / 100;
      }
      // 将文件进行切片
      while (index < count) {
        chunks.push({
          file: (file as RcFile).slice(index * max, (index + 1) * max),
          filename: `${HASH}_${index + 1}.${suffix}`,
        });
        index++;
      }

      // 把每一个切片都上传到服务器上
      chunks.forEach(async (chunk) => {
        // 已经上传过的切片无需再上传
        if (
          alreadyUploadChunks.length > 0 &&
          alreadyUploadChunks.includes(chunk.filename)
        ) {
          await complate();
          return;
        }
        // 上传没有上传过的切片
        const formData = new FormData();
        formData.append("file", chunk.file);
        formData.append("filename", chunk.filename);
        uploadFileSlice(formData)
          .then(async (res: any) => {
            if (res.code === 0) {
              await complate();
              return;
            }
            return Promise.reject(res.codeText);
          })
          .catch((err: Error) => {
            message.error("当前切片上传失败，请您稍后再试~~");
            // 恢复到初始状态
            clear();
          });
      });

      // 处理切片上传成功
      async function complate() {
        // 处理进度条
        setPercent((percent += 1));

        // 当所有切片都上传成功，我们合并切片
        if (percent < count) return;
        setPercent(100);
        // 通知服务器合并所有的切片
        try {
          const data = await mergeFileSlice({
            HASH,
            count,
          });
          if (data.code === 0) {
            message.success(
              `恭喜您，文件上传成功，您可以基于 ${data.servicePath} 访问该文件~~`
            );
            return;
          }
          throw data.codeText;
        } catch (error) {
          message.error("切片合并失败，请您稍后再试~~");
        } finally {
          // 恢复到初始状态
          clear();
        }
      }

      // 恢复到初始状态
      function clear() {
        setPercent(0);
        setUploading(false);
        alreadyUploadChunks = [];
        setFileList([]);
      }
    },
    fileList,
  };

  return (
    <Card>
      <h2 className="font-bold">
        大文件上传
        <Tag style={{ marginLeft: "10px" }} color="#55acee">
          切片上传和断点续传
        </Tag>
      </h2>
      <Divider />
      <div className="h-40 border_dashed p-4">
        <div className="flex flex-wrap">
          {/* 上传组件 */}
          <Upload {...props}>
            <Button
              icon={<UploadOutlined />}
              type="primary"
              loading={uploading}
            >
              {uploading ? "上传中..." : "上传文件"}
            </Button>
          </Upload>
          {/* 进度条 */}
          <Progress
            style={{ display: uploading ? "block" : "none" }}
            percent={percent}
            status="active"
          />
        </div>
      </div>
    </Card>
  );
}
