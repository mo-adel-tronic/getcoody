import { Viewport } from "next";
import { ImageSrc } from "./constants";

export const DESCRIBTION =
  "MyApp Path aims to teach programming and help users build applications. Our platform offers interactive courses, tutorials, and resources to help you master programming and turn your ideas into real-world applications.";

export const ICON = ImageSrc.logo;

export const appViewport: Viewport = {
  viewportFit: "cover",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};
