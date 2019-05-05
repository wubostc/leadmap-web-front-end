
upload demo
```typescript
import React, { useEffect, useRef, useState } from "react";
import { Progress, Row, Col, } from "antd";
import { ProgressProps } from "antd/lib/progress";
import { UploaderCore } from "leadmap-web-front-end";



export function MyUpload() {
  const [precent, setPrecent] = useState(0);
  const [status, setStatus] = useState<ProgressProps["status"]>("normal");
  const [file, setFile] = useState<File>(null);
  const [downloadurl, setDownloadurl] = useState<string>(null);

  const uploader = useRef<UploaderCore>(null);
  const ok_file = useRef<File>(null);


  useEffect(() => {
    if (!file) {
      return;
    }

    new UploaderCore({
      "downloadUrl": "http://183.129.204.238:19007/fastdfs/",
      "endpoint": "http://192.168.1.45:8005/upload/part/file",
      "onError": (error) => {
        setStatus("exception");
        console.error("Failed because: " + error);
      },
      "onProgress": (bytesSent, bytesTotal) => {
        const percentage = (bytesSent / bytesTotal * 100).toFixed(2);
        setPrecent(+percentage);
        console.log(bytesSent, bytesTotal, percentage + "%")
      },
      "onSuccess": (url, id, upload) => {
        ok_file.current = upload.file as File;
        setDownloadurl(url);
        setPrecent(100);
        setStatus("success");
        console.log("下载地址 %s, 文件id %s", url, id);
      }
    }).read(file, _uploader => {
      uploader.current = _uploader;
    });

    return () => uploader.current = null;
  }, [file]);

  // new Blob([{}], {"t"})

  useEffect(() => {
    if (!uploader.current) return;

    if (status === "active") {
      uploader.current.start();
    } else if (status === "normal") {
      uploader.current.abort();
    }
  }, [status]);


  return (
    <>
      <Row>
        <Col span={12} push={6}>
          <Progress percent={precent} status={status} />
        </Col>
      </Row>
      <Row>
        <Col span={12} push={6}>
          <input type="file" onChange={(ev) => {
            if (file !== ev.target.files[0]) {
              setPrecent(0);
              setStatus("normal");
            }
            setFile(ev.target.files[0]);
          }} />
          <button onClick={() => {
            if (file) setStatus("active");
          }}>start</button>
          <button onClick={() => {
            if (file) setStatus("normal");
          }}>stop</button>
        </Col>
      </Row>
      <Row>
        <Col span={12} push={6}>
          { status === "success" ? <a href={downloadurl}>{`下载: ${ok_file.current.name}`}</a> : null }
        </Col>
      </Row>
    </>
  );
}
```