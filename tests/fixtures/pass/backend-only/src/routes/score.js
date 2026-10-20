const express = require('express');
const router = express.Router();

// 只返回当前登录学员本人的成绩
router.get('/mine', async (req, res) => {
  const termId = String(req.query.termId || '');
  const row = await req.db.one(
    'select term_id, total_score from scores where user_id = $1 and term_id = $2',
    [req.user.id, termId],
  );
  res.json({ termId: row.term_id, score: row.total_score });
});

module.exports = router;
