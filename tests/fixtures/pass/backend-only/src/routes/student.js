const express = require('express');
const router = express.Router();

router.get('/me', async (req, res) => {
  const row = await req.db.one(
    'select display_name, grade from profiles where user_id = $1',
    [req.user.id],
  );
  res.json({ name: row.display_name, grade: row.grade });
});

module.exports = router;
