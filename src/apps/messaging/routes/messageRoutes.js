import express from 'express';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';
import {
  createMessage,
  deleteMesage,
  getMessages,
  getMessagesSentByOneUser,
  restrictDeleteToSender,
  updateMessageToReadForAUser,
} from '../controllers/messageController';

const router = express.Router();

router.use(AuthenticationMiddleware.isUserAuthenticated);

router.get('/', getMessages);
router.post('/create-message', createMessage);
router.get('/user', getMessagesSentByOneUser);
router
  .route('/:messageId')
  .patch(updateMessageToReadForAUser)
  .delete(restrictDeleteToSender(), deleteMesage);

module.exports = router;
