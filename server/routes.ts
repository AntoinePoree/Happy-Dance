import * as express from 'express';

import UploadController from './controllers/UploadController';

import CatController from './controllers/CatController';
import ArticleController from './controllers/ArticleController';
import UserController from './controllers/UserController';
import DanceController from './controllers/DanceController';
// import cat from './models/cat';
// import user from './models/user';

export default function routes(app) {

  const router = express.Router();

  const upload = new UploadController();

  const cat = new CatController();
  const article = new ArticleController();
  const dance = new DanceController();
  const user = new UserController();

  // cats
  router.route('/cats').get(cat.getAll);
  router.route('/cats/count').get(cat.count);
  router.route('/cat').post(cat.insert);
  router.route('/cat/:id').get(cat.get);
  router.route('/cat/:id').put(cat.update);
  router.route('/cat/:id').delete(cat.delete);

  // article
  router.route('/articles').get(article.getAll);
  router.route('/articles/count').get(article.count);
  router.route('/article').post(article.insert);
  router.route('/article/:id').get(article.get);
  router.route('/article/:id').put(article.update);
  router.route('/article/:id').delete(article.delete);

  // dance
  router.route('/dance').get(dance.getAll);
  router.route('/dances/count').get(dance.count);
  router.route('/dance').post(dance.insert);
  router.route('/dance/:id').get(dance.get);
  router.route('/dance/:id').put(dance.update);
  router.route('/dance/:id').delete(dance.delete);

  // users
  router.route('/login').post(user.login);
  router.route('/users').get(user.getAll);
  router.route('/users/count').get(user.count);
  router.route('/user').post(user.insert);
  router.route('/user/:id').get(user.get);
  router.route('/user/:id').put(user.update);
  router.route('/user/:id').delete(user.delete);

  // upload
  router.route('/upload').post(upload.upload);
  router.route('/file/:filename').get(upload.getFile);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
