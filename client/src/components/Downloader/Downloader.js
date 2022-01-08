import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProgressBar from "../ProgressBar/ProgressBar";

import "./Downloader.css";

const Downloader = ({ files = [], remove }) => {
  return (
    <div className="downloader">
      <div className="card">
        <div className="card-header">File Downloader</div>
        <ul className="">
          {files.map((file, index) =>
            <DownloadItem
              key={index}
              removeFile={() => remove(file.downloadId)}
              {...file}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

const DownloadItem = ({ name, link, removeFile }) => {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0
  });

  useEffect(() => {
      const option = {
            onDownloadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent

                setDownloadInfo({
                    progress: Math.floor((loaded * 100 )/ total),
                    loaded,
                    total,
                    completed: false
                })
            }
      };
      
      axios.get(link, {
          responseType: "blob",
          ...option,
      }).then((res) => {
          const url = window.URL.createObjectURL(
              new Blob([res.data], {
                  type: res.headers['content-type']
              })
          );

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', link);
          document.body.appendChild(link)
          link.click()

          setDownloadInfo(info => (
              {
                  ...info, completed: true
              }
          ));

          setTimeout(()=>{
              removeFile()
          }, 4000)
      })
  }, []);

  const formatBytes = bytes => `${ (bytes / (1024*1024)).toFixed(2)} MB`

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 d-flex">
          <div className="d-inline font-weight-bold text-truncate">{name}</div>
          <div className="d-inline ml-2">
            <small>
              
              {
                  downloadInfo.loaded > 0 && <>
                     <span className="text-success">
                         {formatBytes(downloadInfo.loaded)}
                     </span> 
                     / {formatBytes(downloadInfo.total)}
                </>
                }

                {downloadInfo.loaded === 0 && <>Initializing...</>}
            </small>
          </div>
          <div className="d-inline ml-2 ml-auto">
                
                {downloadInfo.completed && 
                <span className="text-success">
                    Completed{" "}
                    <CheckCircleIcon/>
                </span>}
          </div>
        </div>
        <div className="col-12 mt-2">
                <ProgressBar value={downloadInfo.progress}/>
        </div>
      </div>
    </li>
  );
};


export default Downloader