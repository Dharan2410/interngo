import express from 'express';
import { verifyToken } from '../../middleware/auth.js';
import { getattendancebydate , saveAttendance} from './attendance_controller.js';

const router = express.Router();

router.get('/:date',getattendancebydate);
router.post('/getAttendance', saveAttendance);

export default router;  