import { NextFunction, Request, Response } from "express";
import Gatherings from "../model/Gatherings";

export const getGatherings = async (req: Request, res: Response) => {
  const page = Number(req.params.page);
  const skipCount = (page - 1) * 8;
  const gatherings = await Gatherings.find({})
    .sort("-createdAt")
    .skip(skipCount)
    .limit(9);

  let hasNext = false;

  if (gatherings.length > 8) {
    hasNext = true;
  }

  res.send(200).send({ gatherings, hasNext });
};

export const getGathering = async (req: Request, res: Response) => {
  const { id } = req.params;

  const gathering = await Gatherings.findById(id);

  res.status(200).send(gathering);
};

export const createGathering = async (req: Request, res: Response) => {
  const newGathering = { ...req.body };

  const result = await Gatherings.create(newGathering);

  res.status(201).send("success");
};

export const editGathering = async (req: Request, res: Response) => {
  const newGatheringData = { ...req.body };
  const id = newGatheringData.docId;

  delete newGatheringData.docId;

  const newData = newGatheringData;

  const result = await Gatherings.findByIdAndUpdate(
    id,
    { $set: newData },
    { new: true }
  );

  if (!result) {
    res.status(404).send("Document not found");
    return;
  }

  res.status(200).send("success");
};

export const deleteGathering = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Gatherings.findByIdAndDelete(id);

  if (!result) {
    res.status(404).send("Document not found");
    return;
  }

  res.status(200).send("success");
};

export const getMyGatherings = async (req: Request, res: Response) => {
  const { ids } = req.body;

  const results = await Gatherings.find({ _id: { $in: ids } });

  if (!results) {
    res.status(500).send("cannot find gatherings");
    return;
  }

  res.status(200).send(results);
};
