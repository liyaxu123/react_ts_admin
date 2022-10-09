import React, { useState } from "react";
import { Card, Tag, Divider, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import { uploadSingle } from "@/api/upload";

export default function Multifile() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 上传组件的配置参数
  const props: UploadProps = {
    // 限制上传文件的类型
    accept: ".png,.jpg,.jpeg",
    // 支持文件多选
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // console.log("beforeUpload：", file);
      // 保存选中的文件
      fileList.push(file);
      setFileList(fileList);
      return false;
    },
    fileList,
  };

  // 手动处理上传
  async function handleUpload() {
    if (fileList.length === 0) {
      message.error("请您先选择要上传的文件~~");
      return;
    }
    console.log(fileList);

    setUploading(true);

    const uploadList = fileList.map((file) => {
      const formData = new FormData();
      formData.append("file", file as RcFile);
      formData.append("filename", file.name);
      return uploadSingle(formData).then((res: any) => {
        if (res.code !== 0) {
          return Promise.reject(res.codeText);
        }
      });
    });

    Promise.all(uploadList)
      .then(() => {
        message.success("恭喜您，所有文件都上传成功~~");
      })
      .catch(() => {
        message.error("很遗憾，上传过程中出现问题，请您稍后再试~~");
      })
      .finally(() => {
        setFileList([]);
        setUploading(false);
      });
  }

  return (
    <Card>
      <h2 className="font-bold">
        多文件上传
        <Tag style={{ marginLeft: "10px" }} color="#55acee">
          FORM-DATA
        </Tag>
      </h2>
      <Divider />
      <div className="h-40 border_dashed p-4">
        <div className="flex flex-wrap">
          {/* 上传组件 */}
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <Button
            onClick={handleUpload}
            type="primary"
            loading={uploading}
            className="ml-4"
          >
            {uploading ? "上传中..." : "开始上传"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
