
import app from "./src/app";

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Stride API running on port ${PORT}`);
});
