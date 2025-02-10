import { Request, Response } from 'express';
import { gathering } from '../../data/prisma';

export const getGatherings = async (req: Request, res: Response) => {
  const { cursor } = req.query;
  let gatherings;
  if (cursor) {
    gatherings = await gathering.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: 1,
      take: 8,
      cursor: { id: cursor?.toString() },
    });
  } else {
    gatherings = await gathering.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: 0,
      take: 8,
    });
  }

  const lastPost = gatherings.at(7);
  const lastCursor = lastPost?.id;

  res.status(200).send({ gatherings, lastCursor });
};

export const getGathering = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await gathering.findUnique({ where: { id } });

  res.status(200).send(result);
};

export const createGathering = async (req: Request, res: Response) => {
  const {
    title = '',
    description = '',
    lat = '',
    lng = '',
    authorId = '',
  } = req.body;

  if (!title || !description || !lat || !lng || !authorId) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  await gathering.create({
    data: {
      title,
      description,
      lat,
      lng,
      author: {
        connect: { id: authorId },
      },
    },
  });

  res.status(201).send('success');
};

export const editGathering = async (req: Request, res: Response) => {
  const newGatheringData = { ...req.body };
  const id = newGatheringData.docId;

  delete newGatheringData.docId;

  const newData = newGatheringData;

  const result = await gathering.update({
    where: { id },
    data: { ...newData },
  });

  if (!result) {
    res.status(404).send('Document not found');
    return;
  }

  res.status(200).send('success');
};

export const deleteGathering = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await gathering.delete({ where: { id } });

  if (!result) {
    res.status(404).send('Document not found');
    return;
  }

  res.status(200).send('success');
};

export const getMyGatherings = async (req: Request, res: Response) => {
  const { ids } = req.body;

  const results = await gathering.findMany({ where: { id: { in: ids } } });

  if (!results) {
    res.status(500).send('cannot find gatherings');
    return;
  }

  res.status(200).send(results);
};
