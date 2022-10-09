import React, { useState } from "react";
import { Card, Tag, Divider, Upload, Button, Alert, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import { uploadSingleBase64 } from "@/api/upload";
import { fileToBASE64 } from "@/utils/fileTools";

export default function UploadSigleBase64() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 上传组件的配置参数
  const props: UploadProps = {
    // 限制上传文件的类型
    accept: ".png,.jpg",
    // 限制上传数量
    maxCount: 1,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // console.log("beforeUpload：", file);
      // 限制文件大小为2M
      if (file.size > 2 * 1024 * 1024) {
        message.error("文件大小不能超过2M！");
        return Upload.LIST_IGNORE;
      }
      // 保存选中的文件
      setFileList([file]);
      return false;
    },
    // 处理图片上传
    onChange: async ({ file }) => {
      // console.log("onChange：", file);
      if (!file) {
        message.error("请您先选择要上传的文件~~");
        return;
      }
      setUploading(true);
      try {
        const BASE64 = await fileToBASE64(file as RcFile);
        const res = await uploadSingleBase64({
          file: BASE64,
          filename: file.name,
        });
        if (res.code !== 0) {
          throw res.codeText;
        }
        message.success(
          `文件已经上传成功~~,您可以基于 ${res.servicePath} 访问这个资源~~`
        );
        setFileList([]);
      } catch (error) {
        message.error("文件上传失败，请您稍后再试~~");
      } finally {
        setUploading(false);
      }
    },
    fileList,
  };

  return (
    <Card>
      <h2 className="font-bold">
        单一文件上传
        <Tag style={{ marginLeft: "10px" }} color="#55acee">
          BASE64
        </Tag>
        ，只适合图片
      </h2>
      <Divider />
      <div className="h-40 border_dashed p-4">
        <Alert
          message="只能上传 jpg/png 格式图片，且大小不能超过2MB"
          type="success"
        />
        <div className="flex flex-wrap mt-4">
          {/* 上传组件 */}
          <Upload {...props}>
            <Button
              icon={<UploadOutlined />}
              type="primary"
              loading={uploading}
            >
              {uploading ? "上传中..." : "上传图片"}
            </Button>
          </Upload>
        </div>
      </div>
    </Card>
  );
}
