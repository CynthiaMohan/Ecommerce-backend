const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const findAllTags = await Tag.findAll({});
    res.json(findAllTags);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;
  try {
    const findTag = await Tag.findOne({ where: { id } });
    if (!findTag) {
      return res.status(404).json({ Message: 'No Tag Found !!' });
    }
    else
      res.json(findTag);
  } catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }
});

router.post('/', (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const newTag = Tag.create(req.body, { tag_name });
    res.json(newTag);
  } catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const { tag_name } = req.body;
  try {
    const updateTag = Tag.update(req.body, { where: { id }, tag_name });
    res.json(updateTag);

  } catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;
  try {
    const deletedTag = Tag.findOne({ where: { id } });
    if (!deletedTag) {
      res.status(404).json({ Message: 'Tag not Found !!' });
    }
    else {
      await Tag.destroy({ where: { id } });
      res.json(deletedTag);
    }
  } catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }
});

module.exports = router;
