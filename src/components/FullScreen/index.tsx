import React from "react";
import { useFullscreen } from "ahooks";
import { Tooltip } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

function FullScreen() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(
    document.getElementById("root")
  );

  return (
    <Tooltip placement="bottom" title={isFullscreen ? "退出全屏" : "全屏"}>
      <div
        className="h-full flex items-center p-3 cursor-pointer hover:bg-gray-50"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? (
          <FullscreenExitOutlined style={{ fontSize: "18px" }} />
        ) : (
          <FullscreenOutlined style={{ fontSize: "18px" }} />
        )}
      </div>
    </Tooltip>
  );
}

export default React.memo(FullScreen);
