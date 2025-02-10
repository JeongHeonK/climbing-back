import express from 'express';
import {
  getGatherings,
  getGathering,
  createGathering,
  editGathering,
  deleteGathering,
  getMyGatherings,
} from '../service/migrate/gathering';

const gatheringRoute = express.Router();

// 페이지 초기 진입 요청
gatheringRoute.get('/', getGatherings);

gatheringRoute.get('/:id', getGathering);

gatheringRoute.post('/', createGathering);

gatheringRoute.patch('/:id', editGathering);

gatheringRoute.delete('/:id', deleteGathering);

// 찜하기시 사용 예정
gatheringRoute.post('/myGathering', getMyGatherings);

export default gatheringRoute;
