import Mock from 'mockjs';
Mock.mock("api/getVideoList","get",{
    Id: 1,
    author: "字节君",
    url: "xx.xx.xx/video/1.mp4",
    description: "字节跳动8周年，不忘初心,always Day1",
    taglist: ["一个普通公司的8年"],
    likes: 586892,
    comments: 23456,
});