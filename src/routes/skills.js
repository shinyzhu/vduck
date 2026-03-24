'use strict';

const { Router } = require('express');
const store = require('../store');

const router = Router();

// GET /api/skills
router.get('/', (req, res) => {
  res.json(store.listSkills());
});

// POST /api/skills
router.post('/', (req, res) => {
  const { name, content, description, enabled } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const skill = store.createSkill({ name, content, description, enabled });
  res.status(201).json(skill);
});

// GET /api/skills/:id
router.get('/:id', (req, res) => {
  const skill = store.getSkill(req.params.id);
  if (!skill) return res.status(404).json({ error: 'Not found' });
  res.json(skill);
});

// PATCH /api/skills/:id
router.patch('/:id', (req, res) => {
  const updated = store.updateSkill(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(updated);
});

// DELETE /api/skills/:id
router.delete('/:id', (req, res) => {
  const ok = store.deleteSkill(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

module.exports = router;
