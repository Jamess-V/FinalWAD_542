import { MoneyOffCsredRounded } from "@mui/icons-material";
import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: Number
});

const Interest = mongoose.models.interest || mongoose.model("interest", interestSchema);

export default Interest;
