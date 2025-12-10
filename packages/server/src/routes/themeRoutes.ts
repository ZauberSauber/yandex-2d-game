import { Router } from 'express';

import { getTheme, saveTheme } from '../controllers/themeController.js';

const router = Router();

router.post('/', getTheme);
router.put('/', saveTheme);

export default router;
