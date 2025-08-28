import cors from 'cors';
import { app } from '../index';

const corsOptions = {
  origin: ['https://trusted-domain.com'],  // تقييد الوصول للدومينات الموثوقة فقط
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
