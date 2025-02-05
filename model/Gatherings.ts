import mongoose from 'mongoose';

const GatheringsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 5,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Gatherings = mongoose.model('Gatherings', GatheringsSchema);

export default Gatherings;
