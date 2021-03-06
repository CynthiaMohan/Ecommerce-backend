const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const findAllCategories = await Category.findAll({
      include: [{
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }]
    });
    res.json(findAllCategories);
  }
  catch (e) {
    if (e) {
      res.status(500).json(e);
    }
  }

});



router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  console.log(`id is ${id}`);
  try {
    const getCategoryById = await Category.findOne({
      where: { id },
      include: [{
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }]
    });
    res.json(getCategoryById);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    });
    res.json(createCategory);
  }
  catch (err) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  const { category_id, category_name } = req.body;
  try {
    await Category.update(
      { category_name }, { where: { id } });
    const updatedCategory = await Category.findOne({ where: { id } });
    res.json(updatedCategory);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const deletedCategory = await Category.findOne({ where: { id } });

    const deleteCategory = await Category.destroy({ where: { id } });
    if (!deleteCategory) {
      res.status(404).json({ error: 'This category does not exist' });
    }
    res.json(deletedCategory);
    // res.json({ Message: 'Category Deleted' });

  }
  catch (e) {
    res.json(e);
  }
});
module.exports = router;
