const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const findAllTags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });
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

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create(req.body, { tag_name });
    res.json(newTag);
  } catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const { tag_name } = req.body;
  try {

    await Tag.update({ tag_name }, { where: { id } });
    const updatedTag = await Tag.findOne({ where: { id } });
    res.json(updatedTag);

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
    const deletedTag = await Tag.findOne({ where: { id } });
    if (!deletedTag) {
      res.status(404).json({ Message: 'Tag not Found !!' });
    }
    await Tag.destroy({ where: { id } });
    res.json(deletedTag);

  } catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }
});

module.exports = router;
