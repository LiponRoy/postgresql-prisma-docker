import app from "./app";
import { ENV } from "./config/env";

const PORT = ENV.port || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)); 
