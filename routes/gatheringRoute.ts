import express from "express";

const gatheringRoute = express.Router();

// 페이지 초기 진입 요청
gatheringRoute.get("/");

gatheringRoute.get("/:id");

gatheringRoute.post("/");

gatheringRoute.patch("/:id");

gatheringRoute.delete("/:id");

// 찜하기시 사용 예정
gatheringRoute.get("/myGathering");

export default gatheringRoute;
