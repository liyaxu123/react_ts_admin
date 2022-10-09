import React, { useState } from "react";
import {
  Card,
  Tag,
  Divider,
  Upload,
  Button,
  Alert,
  message,
  Progress,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import { request2 } from "@/utils/request";

export default function UploadProgress() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState(0);

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
      // 限制文件大小为10M
      if (file.size > 10 * 1024 * 1024) {
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
        let formData = new FormData();
        formData.append("file", file as RcFile);
        formData.append("filename", file.name);
        const res = (await request2({
          method: "post",
          url: "/upload_single",
          data: formData,
          // 该方法与mockjs有冲突，需关闭mockjs，不然会报错
          onUploadProgress: function (ev) {
            const { loaded, total } = ev;
            // 计算进度
            setPercent(Number(((loaded / total) * 100).toFixed(2)));
          },
        })) as any;
        if (res.code !== 0) {
          throw res.codeText;
        }
        message.success(
          `文件已经上传成功~~,您可以基于 ${res.servicePath} 访问这个资源~~`
        );
        setFileList([]);
      } catch (error) {
        console.log(error);
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
          进度管控
        </Tag>
      </h2>
      <Divider />
      <div className="h-40 border_dashed p-4">
        <Alert
          message="只能上传 jpg/png 格式图片，且大小不能超过10MB"
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
