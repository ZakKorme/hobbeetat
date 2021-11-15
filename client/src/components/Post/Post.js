import { HiOutlinePhotograph as PhotoIcon } from "react-icons/hi";
import { AiOutlineFileAdd as FileIcon } from "react-icons/ai";

const Post = () => {
  return (
    <div data-theme="light" style={{ marginRight: "10%" }}>
      <ul class="menu py-3 shadow-lg bg-base-100 rounded-box">
        <li class="menu-title">
          <span>Post</span>
        </li>
        <li>
          <div class="form-control">
            <div class="flex">
              <div class="avatar" style={{ paddingLeft: "3%" }}>
                <div class="rounded-full w-10 h-10 m-1">
                  <img src="https://i.pravatar.cc/500?img=32" alt="avatar" />
                </div>
              </div>
              <label class="label">
                <span class="label-text" style={{ fontWeight: "bold" }}>
                  Share what you've been up to!
                </span>
              </label>
            </div>

            <textarea
              class="textarea h-6 textarea-bordered"
              placeholder="Title your post.."
              style={{
                marginTop: "2%",
                marginBottom: "5px",
                marginRight: "45%",
                marginLeft: "3%",
              }}
            ></textarea>
            <textarea
              class="textarea h-24 textarea-bordered"
              placeholder="Create a post.."
              style={{
                marginRight: "35%",
                marginBottom: "3%",
                marginLeft: "3%",
              }}
            ></textarea>
            <div style={{ display: "flex" }}>
              <button style={{ display: "inline-flex", paddingLeft: "1%" }}>
                <PhotoIcon className="w-5 h-5 m-1" />
                <span style={{ fontWeight: "bold", paddingTop: "2px" }}>
                  Photo/Video&nbsp;
                </span>
              </button>
              <button style={{ display: "inline-flex", paddingLeft: "1%" }}>
                <FileIcon className="w-5 h-5 m-1" />
                <span
                  style={{
                    fontWeight: "bold",
                    paddingTop: "2px",
                  }}
                >
                  Attach File
                </span>
              </button>
              <button
                class="btn btn-sm"
                style={{ alignSelf: "flex-end", marginLeft: "55%" }}
              >
                Post
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    // <div data-theme="light">
    //   <span class="menu-title">Post</span>

    //   <div class="form-control">
    //     <div class="flex-none">
    //       <div class="avatar">
    //         <div class="rounded-full w-10 h-10 m-1">
    //           <img src="https://i.pravatar.cc/500?img=32" alt="avatar" />
    //         </div>
    //       </div>
    //     </div>
    //     <label class="label">
    //       <span class="label-text">Share what you've been up to</span>
    //     </label>
    //     <textarea
    //       class="textarea h-6 textarea-bordered"
    //       placeholder="Title your post.."
    //       style={{ marginBottom: "5px", marginRight: "45%" }}
    //     ></textarea>
    //     <textarea
    //       class="textarea h-24 textarea-bordered"
    //       placeholder="Create a post.."
    //       style={{ marginRight: "35%" }}
    //     ></textarea>
    //   </div>
    // </div>
  );
};

export default Post;
