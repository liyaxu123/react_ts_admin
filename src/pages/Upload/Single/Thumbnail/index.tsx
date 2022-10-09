import React, { useState } from "react";
import { Card, Tag, Divider, Upload, Button, Alert, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import { uploadSingle } from "@/api/upload";

export default function Thumbnail() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 上传组件的配置参数
  const props: UploadProps = {
    // 限制上传文件的类型
    accept: ".png,.jpg,.jpeg",
    // 限制上传数量
    maxCount: 1,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file: any) => {
      // console.log("beforeUpload：", file);
      // 限制文件大小为2M
      if (file.size > 2 * 1024 * 1024) {
        message.error("文件大小不能超过2M！");
        return Upload.LIST_IGNORE;
      }
      // 设置图片预览图，通过 URL.createObjectURL(file) 生成临时链接
      file.thumbUrl = URL.createObjectURL(file);
      // 保存选中的文件
      setFileList([file]);
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
    const formData = new FormData();
    formData.append("file", fileList[0] as RcFile);
    formData.append("filename", fileList[0].name);
    setUploading(true);
    try {
      const res = await uploadSingle(formData);
      if (res.code !== 0) {
        throw res.codeText;
      }
      message.success(
        `文件已经上传成功~~,您可以基于 ${res.servicePath} 访问这个资源~~`
      );
      setFileList([]);
    } catch (err) {
      message.error("文件上传失败，请您稍后再试~~");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Card>
      <h2 className="font-bold">
        单一文件上传
        <Tag style={{ marginLeft: "10px" }} color="#55acee">
          缩略图处理
        </Tag>
      </h2>
      <Divider />
      <div className="h-50 border_dashed p-4">
        <Alert
          message="只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB"
          type="success"
        />
        <div className="flex flex-wrap mt-4">
          {/* 上传组件 */}
          <Upload {...props} listType="picture">
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <Button
            onClick={handleUpload}
            disabled={fileList.length ? false : true}
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
