import { message } from "antd";

export function getUserId() {
  var userid = localStorage.getItem("user_id");
  if (userid == undefined) {
    message.warn("请重新登陆");
    return null;
  }
  return userid;
}

export function formatTime(str) {
  let date = new Date(str);
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth()+1) +
    "/" +
    date.getDate() +
    "\xa0\xa0\xa0\xa0" +
    (date.getHours() > 9 ? "" : "0") +
    date.getHours() +
    ":" +
    (date.getMinutes() > 9 ? "" : "0") +
    date.getMinutes()
  );
}
