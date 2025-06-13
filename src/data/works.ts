export interface Work {
  title: string;
  description: string;
  src: string;
  uploadDate?: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT4M30S" for 4 minutes 30 seconds)
  tags?: string[];
}

export const works: Work[] = [
  {
    title: "jazzy_house_title_v2",
    description: "jazzy_house_description_v2",
    src: "https://www.youtube.com/embed/unfvfyO3lOk?si=fqAl4smK4mau4Lra",
    uploadDate: "2025-06-11", // Jazz视频上传日期
    duration: "PT22M22S", // Jazz视频时长：22分22秒
    tags: ["house", "jazz", "electronic", "live guitar", "improvisation"]
  },
  {
    title: "funky_house_title_v1",
    description: "funky_house_description_v1",
    src: "https://www.youtube.com/embed/eVjDLGp4xY8?si=PriNfhbpdiaaYZmA",
    uploadDate: "2025-01-05", // Funk视频上传日期
    duration: "PT37M", // Funk视频时长：37分钟
    tags: ["funky house", "soulful", "live performance", "electronic", "guitar"]
  }
];
