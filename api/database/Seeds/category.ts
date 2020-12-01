import mongoose from 'mongoose'
import { category_default } from '../../constants'
import { CategoryModel } from '../Models'
import { SeedSchema } from '../Schemas'
import table from '../tableName'

const SeedModel = mongoose.model(table.seed, SeedSchema)

const seed_1606213078214: () => void = () => {
  const seed = 1606213078214
  SeedModel.findOne({ body: seed }).then(res => {
    if (!res) {
      const newSeed = new SeedModel({ body: seed })
      newSeed.save()
      category_default.forEach(category => {
        const newCategory = new CategoryModel({ name: category, description: '' })
        newCategory.save()
      })
    }
  })
}

const run_seeds = () => {
  seed_1606213078214()
}

run_seeds()
