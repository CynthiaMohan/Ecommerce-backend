const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      // include: [{
      // model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      // }]
    });
    res.json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});



router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  try {
    const getCategoryById = Category.findOne({
      where: { id }
    });
    res.json(getCategoryById);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const updateCategory = await Category.update(req.body, { category_name, where: { id } });
    if (!updateCategory) {
      res.status(404).json({ error: 'Category Not Found !!' });
    }
    res.json(updateCategory);
  }
  catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const deletedCategory = Category.findOne({ category_name }, { where: { id } });
    console.log(deletedCategory);
    if (!deletedCategory) {
      res.status(404).json({ error: 'This category does not exist' });
    }
    const deleteCategory = await Category.destroy({ where: { id } });
    res.json(deletedCategory);
  }
  catch (e) {
    res.json(e);
  }
});
module.exports = router;
