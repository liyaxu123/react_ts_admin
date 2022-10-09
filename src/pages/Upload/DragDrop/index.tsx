import React, { useState } from "react";
import { Card, Divider, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import { uploadSingle } from "@/api/upload";

export default function DragDrop() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 上传组件的配置参数
  const props: UploadProps = {
    // 限制上传文件的类型
    accept: ".png,.jpg,.jpeg",
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
    onDrop(e) {
      console.log("Dropped files", Array.from(e.dataTransfer.files));
    },
    async onChange({ file }) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file as RcFile);
      formData.append("filename", file.name);
      try {
        const res = await uploadSingle(formData);
        if (res.code !== 0) {
          throw res.codeText;
        }
        message.success(
          `文件已经上传成功~~,您可以基于 ${res.servicePath} 访问这个资源~~`
        );
      } catch (err) {
        message.error("文件上传失败，请您稍后再试~~");
      } finally {
        setFileList([]);
      }
    },
    fileList,
  };

  return (
    <Card>
      <h2 className="font-bold">拖拽上传</h2>
      <Divider />
      {/* 上传组件 */}
      <Upload.Dragger className="h-40" {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">
          支持单个或批量上传。严禁上传公司数据或其他隐私文件
        </p>
      </Upload.Dragger>
    </Card>
  );
}
