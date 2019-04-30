import { Md5 } from "ts-md5";
import { Upload, UploadOptions } from "tus-js-client";
import { Cookies } from "react-cookie";


export
interface UploaderCore_t {
  endpoint: UploadOptions["endpoint"];
  downloadUrl: string;
  retryDelays?: UploadOptions["retryDelays"];
  onError?: UploadOptions["onError"];
  onProgress?: UploadOptions["onProgress"];
  onSuccess?: (downloadurl: string, fid: string, upload: Upload) => void;
}


function _read_as_buf(blob: Blob, callback: (fr: FileReader, e: ProgressEvent) => void) {
  const fr = new FileReader();
  fr.onload = function (ev) {
    callback && callback(this, ev);
  }
  fr.readAsArrayBuffer(blob);

  return;
}

export
class UploaderCore {

  private opts: UploaderCore_t;
  private upload: Upload;

  public constructor(opts: UploaderCore_t) {
    this.upload = null;
    this.opts = opts;
  }

  public read(file: File, read_callback?: (upload: UploaderCore) => void) {
    const opts = this.opts;
  
    _read_as_buf(file, (fr, e) => {

      if (fr.readyState === 2/*DONE*/ && !fr.error) {
        
        if (fr.result.constructor === ArrayBuffer) {

          const md5 = new Md5().appendByteArray(new Uint8Array(fr.result as ArrayBuffer)).end() as string;

          const _opts: UploadOptions = {
            endpoint: opts.endpoint,
            resume: true,
            retryDelays: opts.retryDelays || [0, 3000, 5000, 10000, 20000],
            headers: {
              "X-Requested-With": UploaderCore.gettoken(),
              "fileMd5": md5,
              "originName": encodeURI(file.name),
            },
            fingerprint: (file, opts) => md5,
            onError: (err) => {
              opts.onError && opts.onError(err);
            },
            onProgress: (bytesUploaded, bytesTotal) => {
              opts.onProgress && opts.onProgress(bytesUploaded, bytesTotal);
            },
            onSuccess: () => {
              interface T extends Upload {
                _xhr: XMLHttpRequest;
              }
              const upload = this.upload as T;
              const id = upload._xhr.getResponseHeader("Tus-FileId");
              opts.onSuccess && opts.onSuccess(`${opts.downloadUrl}${id}`, id, this.upload);
            }
          }

          this.upload = new Upload(file, _opts);

          read_callback && read_callback(this);

        }

      }

    });

  }


  public start() {
    this.upload.start();
  }

  public abort() {
    this.upload.abort();
  }

  public setopts(opts: UploaderCore_t) {
    this.opts = opts;
  }

  private static gettoken() {
    return `lb_token=${new Cookies().get("lb_token")}`;
  }
}

