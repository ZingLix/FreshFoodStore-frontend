import { message } from "antd";

export function getUserId() {
  var userid = localStorage.getItem("user_id");
  if (userid == undefined) {
    message.warn("请重新登陆");
    return null;
  }
  return userid;
}
