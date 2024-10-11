import mongoose from "mongoose";

const WellboreSchema = new mongoose.Schema({
  uwi: { type: Number, required: true },
  wellborename: { type: String, required: true },
  field: { type: String, required: true },
  wellboretype: { type: String },
});

const Wellbore =
  mongoose.models.Wellbore || mongoose.model("Wellbore", WellboreSchema);

export default Wellbore;
