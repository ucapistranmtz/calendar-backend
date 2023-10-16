const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  console.log('/ required');
  res.status = 200;
  res.json({
    ok: true,
  });
});

module.exports = router;
